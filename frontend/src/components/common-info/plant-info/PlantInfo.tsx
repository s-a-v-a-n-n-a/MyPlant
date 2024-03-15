export interface PlantInfo {
    id: number;
    userId: number;
    userName?: string;
    imageUri?: string | null;
    name: string;
    age?: number | null;
    waterFrequency?: number | null;
    nextWaterTime: Date;
    blogId?: number | null;
}