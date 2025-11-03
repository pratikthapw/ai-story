import BookContainer from "@/components/book-flip/book-container"
import BookFlip from "@/components/book-flip/flip-book"
import { story } from "@/lib/temp-story-data"

const Page = () => {
  return (
    <BookContainer variant="custom-flip">
      <BookFlip pages={story.pages} />
    </BookContainer>

  )
}

export default Page