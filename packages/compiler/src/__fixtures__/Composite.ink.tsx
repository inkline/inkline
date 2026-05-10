// @ts-nocheck
/* eslint-disable */
import { createSignal, defineComponent } from "@inkline/core";

const Composite = defineComponent(() => {
  const [showDetails, setShowDetails] = createSignal(false);

  return (
    <>
      <Card>
        <p>Default slot content.</p>
      </Card>

      <Card header={<h2>Card with Named Slots</h2>} footer={<small>Footer text</small>}>
        <p>Body content for the named-slot card.</p>
      </Card>

      <Button
        label="Toggle Details"
        tone="primary"
        onClick={() => setShowDetails(!showDetails())}
      />

      {showDetails() && (
        <>
          <Counter />
          <List />
        </>
      )}
    </>
  );
});
