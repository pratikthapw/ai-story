export interface TSingleStory {
    id: number
    userId: string
    title: string
    childName: string
    childAge: number
    childGender: string
    interests: string[]
    storyLine: string | null
    theme: string
    artStyle: string
    setting: null
    companions: string[]
    pageCount: number
    childImageUrl: null
    status: string
    pdfUrl: string | null
    thumbnailUrl: string
    metadata: null
    createdAt: string
    updatedAt: string
    pages: PagesItem[]
    characters: string[]
    pdfDownloadUrl: string | null
}

interface PagesItem {
    id: number
    storyId: number
    pageNumber: number
    content: string
    imageUrl: string
    imagePrompt: string
    status: string
    createdAt: string
    updatedAt: string
}