import { defineComponent } from "@inkline/core";
export default defineComponent((props: { name: string; age: number }) => {
  return (
    <p>
      {props.name} is {props.age} years old
    </p>
  );
});
