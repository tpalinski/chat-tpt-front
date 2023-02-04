
type Props = {
    nickname?: string
    logout: () => void
}

export function UserInfo(props: Props) {

    return (
        <div className="UserInfo">
            <h3> Welcome {props.nickname ? props.nickname : "unknown"}</h3>
            <button onClick={props.logout}> Log out </button>
        </div>
    )
}