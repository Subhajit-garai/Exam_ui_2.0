import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ActivityStats {
    streak: number;
    totalXp: number;
    quizzesCompleted: number;
    challengesCompleted: number;
}

interface ActivityState {
    stats: ActivityStats | null;
    loading: boolean;
    error: string | null;
}

const initialState: ActivityState = {
    stats: null,
    loading: false,
    error: null,
};

const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        setActivityStats: (state, action: PayloadAction<ActivityStats>) => {
            state.stats = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setActivityStats, setLoading, setError } = activitySlice.actions;
export default activitySlice.reducer;
