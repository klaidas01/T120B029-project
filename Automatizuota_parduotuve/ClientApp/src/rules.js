const rules = {
    visitor: {
      static: []
    },
    user: {
      static: [
        "items:list",
        "navbar:view",
        "cart:view",
        "orders:view",
        "robots:list",
      ],
      dynamic:
        {
          "orders:retrieve": ({userId, orderOwnerId, state}) => {
            if (!userId || !orderOwnerId || !state) return false;
            return userId === orderOwnerId && state === 3;
          }
        }
    },
    admin: {
      static: [
        "items:list",
        "items:create",
        "items:delete",
        "robots:list",
        "robots:create",
        "robots:delete",
        "navbar:view",
        "cart:view",
        "orders:view",
      ],
      dynamic: 
        {
            "orders:retrieve": ({userId, orderOwnerId, state}) => {
              if (!userId || !orderOwnerId || !state) return false;
              return userId === orderOwnerId && state === 3;
            }
        }
    },
    system: {
        static: [
            "navbar:view",
            "orders:view",
        ],
        dynamic: 
          {
            "orders:start": ({state}) => {
              return (state === 0);
            },
            "orders:complete": ({state}) => {
                return (state === 1);
              }
          },  
        
      }
  };
  
  export default rules;