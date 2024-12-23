import { attraction } from "@/Type";
import { create } from "zustand";


interface userLocationStore {
    locationState: {
        lat: number,
        lng: number
    },
    locationArea: string,
    setLocation: (state: { lat: number; lng: number }) => void;
    setArea: (state: string) => void
}

export const userLocationStore = create<userLocationStore>((set) => ({
    locationState: {
        lat: 37.564214,
        lng: 127.0016985
    },
    locationArea: "검색 중",
    setLocation: (state) => set({ locationState: state}),
    setArea: (state) => set({locationArea: state})

}));

interface randomTagStore {
    tag: string,
    img: string,
    des: string,
    setTag: (state: string) => void,
    setImg: (state: string) => void,
    setDes: (state: string) => void
}

export const randomTagStore = create<randomTagStore>((set) => ({
    tag: "",
    img: "",
    des: "",
    setTag: (state) => set({tag: state }),
    setImg: (state) => set({img: state}),
    setDes: (state) => set({des: state})
}));


interface selectedAreaStore {
    selectedArea: string,
    setArea: (state: string) => void
}

export const selectedAreaStore = create<selectedAreaStore>((set) => ({
    selectedArea: "서울특별시",
    setArea: (state) => set({selectedArea: state})
}))

interface selectedAttraction {
    Attraction: attraction | undefined,
    setAttraction: (state: attraction) => void
}

export const selectedAttraction = create<selectedAttraction>((set) => ({
    Attraction: undefined,
    setAttraction: (state) => set({Attraction: state})
}))