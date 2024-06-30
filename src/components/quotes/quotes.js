import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./quotes.module.css";

export default function Quotes() {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = () => {
    setLoading(true);
    axios
      .get(`https://type.fit/api/quotes`)
      .then((res) => {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        const { text, author } = res.data[randomIndex];
        const cleanAuthor = author.replace(", type.fit", "");
        setQuote({ text, author: cleanAuthor });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.status);
        setLoading(false);
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h2>Quote of the Day</h2>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.dualRing}></div>
          </div>
        ) : (
          <section className={styles.section}>
            <p className={styles.quote}>{quote.text}</p>
            <span className={styles.author}>-- {quote.author}</span>
          </section>
        )}
      </div>
    </div>
  );
}