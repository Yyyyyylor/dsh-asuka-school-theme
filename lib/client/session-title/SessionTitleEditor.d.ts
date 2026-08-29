import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
interface SessionTitleEditorInjected {
    renameTitle: (title: string) => Promise<void>;
}
type SessionTitleEditorProps = PropsRuntime<'conversation.session.header.actions'> & PropsLocale<'settings.asuka-school'> & SessionTitleEditorInjected;
export declare function SessionTitleEditor({ sessionId, useSessions, renameTitle, t }: SessionTitleEditorProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=SessionTitleEditor.d.ts.map