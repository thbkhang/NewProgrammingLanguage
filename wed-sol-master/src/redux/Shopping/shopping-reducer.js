import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products:[
    {
      "id": 1,
      "brand": "Asian Creative",
      "title": "White & Blue Sneakers",
      "image": "https://i.pinimg.com/originals/87/af/0e/87af0e79c9bf3ca907fb1d944c401224.jpg",
      "isAssured": false,
      "mrp": 3000,
      "offer": 35,
      "sellingPrice": 1950,
      "size": "42",
      "idealFor": "Men" 
    },
    {
      "id": 2,
      "brand": "On Cloud",
      "title": "Grey Sneakers",
      "image": "https://runtoparadise.com/wp/wp-content/uploads/2022/08/on-cloud-5-men-running-shoe-zinc-canyonCloud5-No5-300x300.png",
      "isAssured": true,
      "mrp": 5499,
      "offer": 65,
      "sellingPrice": 1925,
      "size": "42",
      "idealFor": "WoMen" 
    },
    {
      "id": 3,
      "brand": "Jordan",
      "title": "Nike Air Jordan Sneakers",
      "image": "https://i.pinimg.com/736x/1a/9d/97/1a9d97e0a5c49f28d66597ff6b63d407--mens-shoes-shoes-sneakers.jpg",
      "isAssured": true,
      "mrp": 1990,
      "offer": 55,
      "sellingPrice": 897,
      "size": "45",
      "idealFor": "Men" 
    },
    {
      "id": 4,
      "brand": "Jordan",
      "title": "Jordan Air 4 Retro Sneakers",
      "image": "https://www.sneakers-actus.fr/wp-content/uploads/2013/09/illustration-jordan-3.jpg",
      "isAssured": true,
      "mrp": 2999,
      "offer": 76,
      "sellingPrice": 700,
      "size": "42",
      "idealFor": "WoMen" 
    },
    {
      "id": 5,
      "brand": "Yonex",
      "title": "Yonex SHB 65 Z2 Navy",
      "image": "https://sport-net.dk/1403-large_default/yonex-shb-65-z2-navy.jpg",
      "isAssured": true,
      "mrp": 1599,
      "offer": 56,
      "sellingPrice": 700,
      "size": "45",
      "idealFor": "Men" 
    },
    {
      "id": 6,
      "brand": "Skechers",
      "title": "Skechers Running Shoes",
      "image": "https://n1.sdlcdn.com/imgs/h/c/0/Skechers-Green-Running-Shoes-SDL607705425-2-41d77.jpg",
      "isAssured": true,
      "mrp": 2625,
      "offer": 50,
      "sellingPrice": 1294,
      "size": "25",
      "idealFor": "Kids" 
    },
    {
      "id": 7,
      "brand": "Puma",
      "title": "Puma Classic Casual Sneaker",
      "image": "https://cdnc.lystit.com/photos/eeea-2015/01/28/puma-blue-mens-suede-classic-casual-sneakers-from-finish-line-product-1-11869525-0-575640015-normal.jpeg",
      "isAssured": true,
      "mrp": 2499,
      "offer": 73,
      "sellingPrice": 675,
      "size": "45",
      "idealFor": "Men" 
    },
    {
      "id": 8,
      "brand": "Converse All Star",
      "title": "Chuck Taylor All Star Sneakers",
      "image": "https://static3.offshoes.fr/20045-large_default/converse-montante-platform-cuir.jpg",
      "isAssured": true,
      "mrp": 2199,
      "offer": 67,
      "sellingPrice": 726,
      "size": "42",
      "idealFor": "WoMen" 
    },
    {
      "id": 9,
      "brand": "Puma",
      "title": "Puma Star Stars White Sneakers",
      "image": "https://i5.walmartimages.com/asr/12a84c8a-4ab9-4609-ae4e-57bd8424a902_1.21a01fc470e3b6dc3f9a471a8306d9a8.jpeg",
      "isAssured": true,
      "mrp": 2199,
      "offer": 67,
      "sellingPrice": 726,
      "size": "25",
      "idealFor": "Kids" 
    },
    {
      "id": 10,
      "brand": "Pony",
      "title": "Pony Suede Sneakers",
      "image": "https://images-na.ssl-images-amazon.com/images/I/71FVKzSSgTL._UL1500_.jpg",
      "isAssured": true,
      "mrp": 2512,
      "offer": 50,
      "sellingPrice": 1255,
      "size": "42",
      "idealFor": "WoMen" 
    }
  ],
  cart: [],
  wishList:[],
  listOfSelectedFilters:[],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Get Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };

    case actionTypes.SORT_ITEM:
      const sortedProducts = action.payload.sortOrder === 'low'
                              ? state.products.sort((a, b) => a.sellingPrice - b.sellingPrice)
                              : state.products.sort((a, b) => b.sellingPrice - a.sellingPrice)
      return {
        ...state,
        products: [...sortedProducts],
      };

    case actionTypes.FILTER_ITEM:

      let newFilters = [...state.listOfSelectedFilters];

      if(action.payload.checked){
        newFilters.push(action.payload.filterProd)
      } else {
        newFilters = state.listOfSelectedFilters.filter((item) => item !== action.payload.filterProd);
      }

      const filteredProducts = INITIAL_STATE.products.filter((item) => {
        return newFilters.indexOf(item.idealFor) >= 0 ||  newFilters.indexOf(item.brand) >= 0 || newFilters.indexOf(item.size) >= 0
      })

      return {
        ...state,
        products: newFilters.length > 0 ? filteredProducts : INITIAL_STATE.products,
        listOfSelectedFilters: newFilters,
      };


      case actionTypes.WISH_LIST:
      const wishList = state.products.find(
        (item) => item.id === action.payload.id
      )

      const inWishList = state.wishList.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        wishList: inWishList
          ? state.wishList.map((item) =>
              item.id === action.payload.id 
                ? { ...item, qty: item.qty + 0 }
                : item
            ).filter((item) => item.id !== action.payload.id)
         : [wishList, ...state.wishList],
      };

    case actionTypes.REMOVE_WISH_LIST:
      return {
        ...state,
        wishList: state.wishList.filter((item) => item.id !== action.payload.id),
      };
  

    default:
      return state;
  }
};

export default shopReducer;
