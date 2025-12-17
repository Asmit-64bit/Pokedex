
const TypeBadge = ({ type }) => {
  const typeColorVar = `var(--type-${type})`;
  
  return (
    <span
      style={{
        backgroundColor: typeColorVar,
        color: '#fff',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
      }}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
