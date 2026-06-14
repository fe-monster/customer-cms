interface Props {
    isFetchingNextPage:boolean;
    hasNextPage:boolean;
}

const Footer = ({isFetchingNextPage,hasNextPage}:Props) => {
    return (
        <>
            {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Scroll for more" : "All customers loaded"}
        </>
    )
}

export default Footer