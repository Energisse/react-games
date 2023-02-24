export default function GridIcon(){
    return (
        <svg className="tictactoe-svg-grid">
            <line x1="20" y1="100" x2="280" y2="100" />
            <line x1="20" y1="200" x2="280" y2="200" />
            <line x1="100" y1="20" x2="100" y2="280" />
            <line x1="200" y1="20" x2="200" y2="280" />
        </svg>
    )
}