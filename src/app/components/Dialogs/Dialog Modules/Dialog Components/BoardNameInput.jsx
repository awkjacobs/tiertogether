export default function BoardNameInput({ ref, onChange, boardName }) {
    return (
        <label className={`text-purple-200 text-xs leading-loose`}>
            Board Name
            <input
                ref={ref}
                type="text"
                className={`w-full h-14 p-4 text-white bg-surface-500 border-surface-400 border-2 my-2 focus-within:border-surface-200 focus-visible:border-surface-200 focus-visible:outline-offset-0`}
                onChange={onChange}
                value={boardName}
            ></input>
        </label>
    )
}
