// @ts-nocheck
/* eslint-disable */
import { createSignal, defineComponent } from "@inkline/core";

type Tab = "home" | "profile" | "settings";

const SwitchTabs = defineComponent(() => {
  const [activeTab, setActiveTab] = createSignal<Tab>("home");

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("settings")}>Settings</button>
      </nav>

      <Switch fallback={<p>Unknown tab.</p>}>
        <Match when={activeTab() === "home"}>
          <section>
            <h2>Home</h2>
            <p>Welcome to the home page.</p>
          </section>
        </Match>
        <Match when={activeTab() === "profile"}>
          <section>
            <h2>Profile</h2>
            <p>Your profile details go here.</p>
          </section>
        </Match>
        <Match when={activeTab() === "settings"}>
          <section>
            <h2>Settings</h2>
            <p>Configure your preferences here.</p>
          </section>
        </Match>
      </Switch>
    </div>
  );
});
