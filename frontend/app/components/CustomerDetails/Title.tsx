import type { FC, ReactNode } from "react"

const Title:FC<{children: ReactNode}> = ({children}) => {
    return (
        <h2 className="text-xl font-semibold">
          {children}
        </h2>
    )
}

export default Title;