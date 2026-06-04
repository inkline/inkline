import { createResource, defineComponent } from "@inkline/core";

export default defineComponent(() => {
  const [users, { loading: usersLoading }] = createResource(async () => {
    const res = await fetch("/api/users");
    return res.json();
  });
  const [posts, { loading: postsLoading }] = createResource(async () => {
    const res = await fetch("/api/posts");
    return res.json();
  });

  return (
    <div>
      <span>{usersLoading ? "..." : JSON.stringify(users)}</span>
      <span>{postsLoading ? "..." : JSON.stringify(posts)}</span>
    </div>
  );
});
