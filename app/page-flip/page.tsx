import BookContainer from "@/components/book-flip/book-container"
import ReactPageFlip from "@/components/book-flip/react-page-flip"
import { story } from "@/lib/temp-story-data"

const Page = () => {
    return (
        <BookContainer variant="page-flip">
            <ReactPageFlip pages={story.pages} />
        </BookContainer>

    )
}

export default Page