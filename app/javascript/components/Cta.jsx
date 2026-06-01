export default ({ children }) => {
    return <div className="w-full group relative flex items-center justify-end space-x-2">
        <span
            className="relative z-10 text-sm font-bold uppercase leading-6 tracking-wide before:absolute
                                    before:-left-6 before:-top-1/2 before:-z-10 before:h-12 before:w-12 before:rounded-full
                                    before:bg-yellow-400 before:content-[''] group-hover:underline">
                                        {children}
        </span>

        <div className="relative">
            <span className="inline-block transition-transform group-hover:translate-x-1">
                ➔
            </span>
        </div>
    </div>
}