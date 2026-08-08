import { defineComponent } from "@inkline/core";
import IAvatar from "../styled/IAvatar.ink.tsx";

// Inline SVG data URIs (no network) so the story renders identically across every target.
export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatar
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%236366f1'/%3E%3Ccircle cx='24' cy='19' r='9' fill='white'/%3E%3Cpath d='M8 42c0-9 7-14 16-14s16 5 16 14z' fill='white'/%3E%3C/svg%3E"
        alt="Ada Lovelace"
      />
      <IAvatar
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%2310b981'/%3E%3Ccircle cx='24' cy='19' r='9' fill='white'/%3E%3Cpath d='M8 42c0-9 7-14 16-14s16 5 16 14z' fill='white'/%3E%3C/svg%3E"
        alt="Grace Hopper"
        shape="square"
      />
      <IAvatar
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23f59e0b'/%3E%3Ccircle cx='24' cy='19' r='9' fill='white'/%3E%3Cpath d='M8 42c0-9 7-14 16-14s16 5 16 14z' fill='white'/%3E%3C/svg%3E"
        alt="Alan Turing"
        size="lg"
        badge={true}
        badgeColor="success"
      />
    </div>
  );
});
