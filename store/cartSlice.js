import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carItem: [],
  },
  reducers: {
    addToCart: (state,action)=>{
        const item = state.carItem.find((p)=> p.id === action.payload.id)
        if (item) {
          item.quantity++;
          item.price = item.oneQuantityPrice * item.quantity
        } else {
          state.carItem.push({...action.payload , quantity: 1})
        }
    },
    updateCart :(state,action)=>{
      state.carItem = state.carItem.map((p)=>{
        if(p.id === action.payload.id){
          if(action.payload.key === "quantity"){
            p.price = p.oneQuantityPrice * action.payload.val
          }
          return {...p, [action.payload.key]: action.payload.val}
        }
        return p;
      })
    },
    removeFromCart : (state, action)=>{
      state.carItem = state.carItem.filter((p)=>p.id !== action.payload.id)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer