import * as Y from 'yjs';
declare class WSSharedDoc extends Y.Doc {
  name: string;
  mux: mutex.mutex;
  /**
   * Maps from conn to set of controlled user ids. Delete all user ids from awareness when this conn is closed
   */
  conns: Map<Object, Set<number>>;
  awareness: awarenessProtocol.Awareness;
}
