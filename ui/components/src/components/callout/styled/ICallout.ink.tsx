import {
  defineComponent,
  Slot,
  Show,
  defineModel,
  createSignal,
  createMemo,
  hasSlot,
} from "@inkline/core";
import ICalloutBase, { type CalloutBaseProps } from "../headless/ICalloutBase.ink.tsx";
import ICalloutIconBase from "../headless/ICalloutIconBase.ink.tsx";
import ICalloutContentBase from "../headless/ICalloutContentBase.ink.tsx";
import ICalloutDismissBase from "../headless/ICalloutDismissBase.ink.tsx";
import { calloutRecipe, type CalloutRecipeProps as CalloutStylingProps } from "virtual:styleframe";

export interface CalloutProps extends CalloutBaseProps {
  /** Text content; overridden by the default slot. */
  label?: string;
  /** Color variant. */
  color?: CalloutStylingProps["color"];
  /** Style variant. */
  variant?: CalloutStylingProps["variant"];
  /** Size variant. */
  size?: CalloutStylingProps["size"];
  /** Stacking direction of the icon and content. */
  orientation?: CalloutStylingProps["orientation"];
  /** Shows a dismiss button that hides the callout. */
  dismissible?: boolean;
  /** Accessible name for the icon-only dismiss button. */
  dismissAriaLabel?: string;
}

/**
 * The styled Callout: a contextual feedback message that composes the shell, an optional leading
 * icon, the content, and an optional dismiss button — styled together. The icon wrapper is gated
 * by `hasSlot` so it isn't emitted when unused (and collapses via CSS `:empty` on Qwik/Angular,
 * which lack runtime slot presence). Visibility is two-way bindable via `$bind:visible`; when
 * unbound, dismissal is tracked internally and the callout stays mounted but `hidden`.
 */
export default defineComponent(
  { meta: { headless: true }, slots: { default: {}, icon: {}, dismiss: {} } },
  (props: CalloutProps) => {
    const [visible, setVisible] = defineModel<boolean>("visible");
    // Compiled models are controlled-only (a prop + event pair, no internal state), so an internal
    // signal backs the unbound case: a bound `visible` wins, otherwise dismissal tracks locally.
    const [dismissed, setDismissed] = createSignal(false);

    const className = createMemo(() =>
      calloutRecipe({
        color: props.color,
        variant: props.variant,
        size: props.size,
        orientation: props.orientation,
      }),
    );

    const hidden = createMemo(() => (visible() === undefined ? dismissed() : visible() === false));

    return (
      <ICalloutBase class={className()} role={props.role} hidden={hidden()}>
        <Show when={hasSlot("icon")}>
          <ICalloutIconBase>
            <Slot name="icon" />
          </ICalloutIconBase>
        </Show>
        <ICalloutContentBase>
          <Slot>{props.label}</Slot>
        </ICalloutContentBase>
        <Show when={!!props.dismissible}>
          <ICalloutDismissBase
            ariaLabel={props.dismissAriaLabel}
            onClick={() => {
              setDismissed(true);
              setVisible(false);
            }}
          >
            <Slot name="dismiss">{"×"}</Slot>
          </ICalloutDismissBase>
        </Show>
      </ICalloutBase>
    );
  },
);
