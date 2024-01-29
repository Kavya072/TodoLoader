import { useEffect, useState } from "react";

const Todos = () => {
  const [data, setData] = useState([]);
  const [page, setPages] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`
      );
      const result = await response.json();
      setData((prevTodos) => {
        return prevTodos.concat(result);
      });
      setLoading(false);
    };
    fetchTodos();
  }, [page]);

  const loadMoreTodos = () => {
    setPages((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {isLoading ? (
        <>Loading.......</>
      ) : (
        <div>
          <ul style={{ backgroundColor: "lightblue" }}>
            {data.map((item) => {
              return (
                <li key={item.id} style={{ listStyle: "none" }}>
                  {`${item.id} .`}
                  {item.title}
                </li>
              );
            })}
          </ul>
          <button
            style={{
              color: "white",
              fontSize: "40px",
              backgroundColor: "black",
              marginTop: "0px",
              height: "50px",
              width: "70vw",
              borderRadius: "15px",
            }}
            onClick={loadMoreTodos}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Todos;
