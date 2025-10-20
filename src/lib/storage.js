
const get = (k, d) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d));
const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));


/** HISTÓRICO DE BUSCAS **/
export const HistoryStore = {
  all: () => get("app:history", []),
  add: (e) => set("app:history", [e, ...HistoryStore.all()]),
  clear: () => set("app:history", []),
};


/** RASTREIO DE PEDIDOS **/
export const TrackStore = {
  all: () => get("app:tracking", []),
  upsert: (order) => {
    const list = TrackStore.all();
    const i = list.findIndex(o => o.id === order.id);
    if (i >= 0) list[i] = order; else list.unshift(order);
    set("app:tracking", list);
  },
  clear: () => set("app:tracking", []),
};


export const RewardsStore = {
  get: () => get("app:rewards", { points: 0, history: [] }),
  set: (r) => set("app:rewards", r),
  clear: () => set("app:rewards", { points: 0, history: [] }),
};