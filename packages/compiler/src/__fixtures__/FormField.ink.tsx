// @ts-nocheck
/* eslint-disable */
import { createRef, createSignal, defineComponent, onMount } from "@inkline/core";

const FormField = defineComponent(() => {
  const [name, setName] = createSignal("");
  const [country, setCountry] = createSignal("us");
  const [bio, setBio] = createSignal("");
  const inputRef = createRef<HTMLInputElement>();

  onMount(() => {
    inputRef.current?.focus();
  });

  return (
    <form>
      <label>
        Name
        <input $bind:value={setName} ref={inputRef} type="text" />
      </label>
      <label>
        Country
        <select $bind:value={setCountry}>
          <option value="us">United States</option>
          <option value="eu">European Union</option>
          <option value="uk">United Kingdom</option>
        </select>
      </label>
      <label>
        Bio
        <textarea $bind:value={setBio} rows={4} />
      </label>
    </form>
  );
});
