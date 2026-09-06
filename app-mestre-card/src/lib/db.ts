import type { MestreCardData, StudySessionRecord } from '../types/mestre-card';

const DB_NAME = 'MestreCardDB';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      reject(new Error(`Erro ao abrir o IndexedDB: ${(event.target as IDBOpenDBRequest).error?.message}`));
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('cards')) {
        const cardsStore = db.createObjectStore('cards', { keyPath: 'id' });
        cardsStore.createIndex('topic', 'topic', { unique: false });
        cardsStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }

      if (!db.objectStoreNames.contains('history')) {
        const historyStore = db.createObjectStore('history', { keyPath: 'id' });
        historyStore.createIndex('cardId', 'cardId', { unique: false });
        historyStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };
  });
}

export const db = {
  async getCard(id: string): Promise<MestreCardData | null> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('cards', 'readonly');
      const store = transaction.objectStore('cards');
      const request = store.get(id);

      transaction.onerror = () => reject(new Error('Erro na transação getCard'));
      request.onerror = () => reject(new Error('Erro na requisição getCard'));

      request.onsuccess = () => resolve(request.result || null);
    });
  },

  async saveCard(card: MestreCardData): Promise<void> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('cards', 'readwrite');
      const store = transaction.objectStore('cards');
      const request = store.put(card);

      transaction.onerror = () => reject(new Error('Erro na transação saveCard'));
      transaction.oncomplete = () => resolve();
      request.onerror = () => reject(new Error('Erro na requisição saveCard'));
    });
  },

  async getAllCards(): Promise<MestreCardData[]> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('cards', 'readonly');
      const store = transaction.objectStore('cards');
      const request = store.getAll();

      transaction.onerror = () => reject(new Error('Erro na transação getAllCards'));
      request.onerror = () => reject(new Error('Erro na requisição getAllCards'));

      request.onsuccess = () => resolve(request.result || []);
    });
  },

  async deleteCard(id: string): Promise<void> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('cards', 'readwrite');
      const store = transaction.objectStore('cards');
      const request = store.delete(id);

      transaction.onerror = () => reject(new Error('Erro na transação deleteCard'));
      transaction.oncomplete = () => resolve();
      request.onerror = () => reject(new Error('Erro na requisição deleteCard'));
    });
  },

  async saveStudySession(session: StudySessionRecord): Promise<void> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('history', 'readwrite');
      const store = transaction.objectStore('history');
      const request = store.put(session);

      transaction.onerror = () => reject(new Error('Erro na transação saveStudySession'));
      transaction.oncomplete = () => resolve();
      request.onerror = () => reject(new Error('Erro na requisição saveStudySession'));
    });
  },

  async clearAllHistoricErrors(): Promise<number> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('history', 'readwrite');
      const store = transaction.objectStore('history');
      const request = store.openCursor();
      let clearedCount = 0;

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const session = cursor.value as StudySessionRecord;
          if (session.details?.sessionErrors && session.details.sessionErrors.length > 0) {
            session.details.sessionErrors = [];
            cursor.update(session);
            clearedCount++;
          }
          cursor.continue();
        } else {
          resolve(clearedCount);
        }
      };
      request.onerror = () => reject(new Error('Falha ao limpar historico de erros'));
    });
  },

  async getHistoryByCard(cardId: string): Promise<StudySessionRecord[]> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('history', 'readonly');
      const store = transaction.objectStore('history');
      const index = store.index('cardId');
      const request = index.getAll(cardId);

      transaction.onerror = () => reject(new Error('Erro na transação getHistoryByCard'));
      request.onerror = () => reject(new Error('Erro na requisição getHistoryByCard'));

      request.onsuccess = () => resolve(request.result || []);
    });
  },

  async getSetting<T>(key: string): Promise<T | null> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('settings', 'readonly');
      const store = transaction.objectStore('settings');
      const request = store.get(key);

      transaction.onerror = () => reject(new Error('Erro na transação getSetting'));
      request.onerror = () => reject(new Error('Erro na requisição getSetting'));

      request.onsuccess = () => resolve(request.result ? request.result.value : null);
    });
  },

  async setSetting<T>(key: string, value: T): Promise<void> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('settings', 'readwrite');
      const store = transaction.objectStore('settings');
      const request = store.put({ key, value });

      transaction.onerror = () => reject(new Error('Erro na transação setSetting'));
      transaction.oncomplete = () => resolve();
      request.onerror = () => reject(new Error('Erro na requisição setSetting'));
    });
  },

  async getAllHistory(): Promise<StudySessionRecord[]> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('history', 'readonly');
      const store = transaction.objectStore('history');
      const request = store.getAll();

      transaction.onerror = () => reject(new Error('Erro na transação getAllHistory'));
      request.onerror = () => reject(new Error('Erro na requisição getAllHistory'));

      request.onsuccess = () => resolve(request.result || []);
    });
  },

  async bulkImportData(cards: MestreCardData[], history: StudySessionRecord[]): Promise<void> {
    await this.smartMergeData(cards, history);
  },

  async smartMergeData(
    incomingCards: MestreCardData[],
    incomingHistory: StudySessionRecord[]
  ): Promise<SmartMergeResult> {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(['cards', 'history'], 'readwrite');
      const cardsStore = transaction.objectStore('cards');
      const historyStore = transaction.objectStore('history');

      let addedCards = 0;
      let updatedCards = 0;
      let skippedCards = 0;
      let addedSessions = 0;

      transaction.onerror = () => reject(new Error('Erro na transação smartMergeData'));
      transaction.onabort = () => reject(new Error('Transação smartMergeData abortada'));
      transaction.oncomplete = () => {
        resolve({ addedCards, updatedCards, skippedCards, addedSessions });
      };

      const getAllCardsReq = cardsStore.getAll();
      const getAllHistoryReq = historyStore.getAll();

      getAllCardsReq.onerror = () => reject(new Error('Erro ao carregar cards locais para mesclagem'));
      getAllHistoryReq.onerror = () => reject(new Error('Erro ao carregar histórico local para mesclagem'));

      let existingCardsMap: Map<string, MestreCardData> | null = null;
      let existingHistoryIds: Set<string> | null = null;

      const executeMerge = () => {
        if (existingCardsMap === null || existingHistoryIds === null) return;

        try {
          // 1. Merge não-destrutivo de cards por timestamp updatedAt
          for (const card of incomingCards) {
            const existing = existingCardsMap.get(card.id);
            if (!existing) {
              cardsStore.put(card);
              addedCards++;
            } else if (card.updatedAt > existing.updatedAt) {
              cardsStore.put(card);
              updatedCards++;
            } else {
              skippedCards++;
            }
          }

          // 2. União cumulativa de histórico de sessões TRI por id
          for (const session of incomingHistory) {
            if (!existingHistoryIds.has(session.id)) {
              historyStore.put(session);
              addedSessions++;
            }
          }
        } catch (err) {
          transaction.abort();
          reject(err);
        }
      };

      getAllCardsReq.onsuccess = () => {
        const list: MestreCardData[] = getAllCardsReq.result || [];
        existingCardsMap = new Map(list.map(c => [c.id, c]));
        executeMerge();
      };

      getAllHistoryReq.onsuccess = () => {
        const list: StudySessionRecord[] = getAllHistoryReq.result || [];
        existingHistoryIds = new Set(list.map(s => s.id));
        executeMerge();
      };
    });
  }
};

export interface SmartMergeResult {
  addedCards: number;
  updatedCards: number;
  skippedCards: number;
  addedSessions: number;
}

