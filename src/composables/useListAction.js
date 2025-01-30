export function useListActions(items) {
    const addItem = (item) => {
      if(!item || typeof item !== "object") {
        console.warn("Invalid item: Expected an object.");
        return;
      }

      items.value.push(item);
    };

    const deleteItem = (id) => {
      if(!id){
        console.warn("Invalid ID");
        return;
      }

      const index = items.value.findIndex((item) => item.id === id);

      if(index !== -1){
        items.value.splice(index, 1);
      } else {
        console.warn('Item not found'); 
      } 
    };
  
    return {
      addItem,
      deleteItem,
    };
  }