interface NumberButtonProps {
  buttonValue: number;
}

export default function NumberButton({ buttonValue }: NumberButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const ele = e.target as Element;
    const number = ele.getAttribute("data-number-buttom");
    document.body.style.cursor = `url(
      data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAYAAACw5+G7AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfnCBECJi90y5CyAAAFDElEQVRYw8VYe0xTdxQ+5/ZSmCKGFXEKzk1GCOBjRoXymAU2JTVWy3AuYiaoSzGLoGiYIjgHbjBwqa4RJ04WZxSHhKKURR0+aKmFogIuPoLEuSxDp446h2Bt6e/sD+2NUbtugazfn989Oef77rm/x7kIw4zowLOHDVkLF8LrXA5Uz5vn5KkZpsPowUFMpxFUfu2aKIJCHTkNDabNcZ8nXb5+HYCICDF6ielNQ6NcDm3YQIlSKQSglAsaO1YoUEMzWGd/P1vPL6VxZWU47AbiTfv1qffvgx3egGw/P1dxdAyk4Ge1cq+BBIs1GpqG70PdrFlgo2V0KjHRbaE1cIwit21DGZ2hM8Tzto3eX3ALpkxhTVwi9zHHsQ8GtaizWs+tji+LL7t8+V8bsJy9rd+7YQOoucW4e9EiaCQx+SJCJAaDjefpS6qE8rAwlEMr/OXj41og5sLtW7fgKxoBu27eFPiZOAgnBgbwJqzG8rVrMVpl0jb1FRfDRXgF2/Pyns2DNvSGC6mprR0xM2TrtNqhdihOYrxrvDt+vL2SG81WGQxYAucpOyRE6EwCTcStanVbaez4txpzcwEQERlzlY+Hi5jFhUgkAFRDNS94o1mS8oGDhYVZv/T21Mr8/YVC+bAX3k5JER8RKxxhy5fbc+1z+I90OvSDfgzIyYEYqmXbU1NpKdyAVUScFZuJr6tjvVB0O1GjMVjubPd9dWCgEyzwdBsyd4dK/ghKSsp+ZCnSbq2vFx/paz9c/Xx+WkA7WUdBAUZHtwQZAisqHhtQqV5gcgtsycw0m2MbZU179gy1A8KLiTbN0SeoVABQCIUVFU7ebI6NlcnQ7do8+ElvT61s5UoeFZDOTjc0ePmLfsWMuDgWyybQhxxn9yUD/mCxAIh+5s4ZjRA6XNKHB3gLp+IlRL61IKY4YbJOd+CRxVJbNGoU1w3tNEiUFvpy3iLdoUOeFuoKbCdl0xqlkheIe7Zz/aqjR1nAU1GrPS3zHwzcs0vRZ8UKwQC/WZzmG7lkCY2jn2gy0WO2stLTQl1BFCVOg9L6esEApsI7XN6JE6wLOh0RTwzoPS3TNZy7EeckHF20zL44PJxbCaewOjzc0wLd4sk2zQ09k2fgPF+ET0gUhvu9Dl+9CkYAmOJpee7hPBiFDlAtnGQlycnMRGqHbu5cTwt0B6aCk9x9tVroQN9M67teE6uqAOBT6PO0PPfw2ubVOLhLoRAMjMzwKbUplUohIhO+gfaqKk8LdQX7RVu7SLFvHyf9rGVT0yWFomJv948B9Zs2fX2l66oksKAgqttUolcYjVHd5pDmkRERnhb8HHiQg1yr5UkH33FJ8+fbwFFDNZGRsB8AAQABZBAOAOA4zfri4wHgOjRdueJp3U4IdyF3gdLMgAkDfVlZ2cm9PbUyh8PJD+E6HYgjNBpD/u8pDyO8vTvH/gkvPVWvcvQdqza9o8P7jqiUQnp6XOVnOymbLVUq//eBJqrbHHKGgoPxNBvHrdPr4VsqA+WkSUJAMtyD8h07zEUx82ZXr1/vbqAZ9pFSOr3lgl6dn09i2gj1KSnCg2EeKeE8lnBtOTmeG+oP4Hs41+FAb5rBbmg0UIUXsG3aNKijGvBPSnJb6MlQ73YN/FdQBi3GuLQ0fIjN1KtQwAHMwFWIz/5WYd87Ornfjh8/vzl+zOwxXV1CB4NaJjTdkMvJhwCCY2Ke/a1CCawNpj54QHVek1mjWv036/aJTd/fKgAAAAAASUVORK5CYII=
    ), auto`;
  };
  return (
    <div
      className="bg-yellow-300 w-12 h-12 rounded"
      data-number-buttom={buttonValue}
      onClick={handleClick}
    >
      {buttonValue}
    </div>
  );
}
