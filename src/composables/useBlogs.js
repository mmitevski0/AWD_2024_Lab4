import { createClient } from "contentful";
import { useListActions } from "./useListAction";
import { ref, onBeforeMount, onMounted } from "vue";

const client = createClient({
  space: "hpr0uushokd4",
  accessToken: "jwEHepvQx-kMtO7_2ldjhE4WMAsiDp3t1xxBT8aDp7U",
});

export function useBlogs() {
  const blogs = ref([]);
  const isLoading = ref(false);
  const error = ref(null);


  const { addItem, deleteItem } = useListActions(blogs);

  async function getBlogs() {
    try {

      isLoading.value = true;
      error.value = null;

      const response = await client.getEntries({
        content_type: "blogPost",
        order: "-fields.publishDate",
      });

      blogs.value = response.items.map((item) => ({
        title: item.fields.title,
        description: item.fields.description,
        heroImage: item.fields.heroImage,
        publishDate: item.fields.publishDate,
        id: item.fields.slug,
      }));
    } catch (err) {
      error.value = err.message || "An error occured while fetching blogs";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(getBlogs);

  return {
    blogs,
    isLoading,
    error,
    addItem,
    deleteItem,
  };
}