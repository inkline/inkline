// @ts-nocheck
/* eslint-disable */
import { defineComponent } from "@inkline/core";

const Card = defineComponent(
  {
    name: "Card",
    slots: {
      default: { required: true },
      header: {},
      footer: { scoped: true },
    },
  },
  (
    _props: {},
    slots: {
      default: () => unknown;
      header?: () => unknown;
      footer?: (s: { count: number }) => unknown;
    },
  ) => {
    return (
      <div class="card">
        {slots.header && <div class="card-header">{slots.header()}</div>}
        <div class="card-body">{slots.default()}</div>
        {slots.footer && <div class="card-footer">{slots.footer({ count: 3 })}</div>}
      </div>
    );
  },
);
