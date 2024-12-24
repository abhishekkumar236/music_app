class SessionManager {
  private static instance: SessionManager;
  private session: any;

  private constructor() {
    this.session = new Map<number, string>();
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public createSession(userId: number, sessionId: string) {
    this.session.set(userId, sessionId);
  }

  public getSession(userId: number) {
    return this.session.get(userId);
  }

  public deleteSession(userId: number) {
    this.session.delete(userId);
  }
}

export default SessionManager;
