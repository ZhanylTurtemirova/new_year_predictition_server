import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Wish } from "../../core/models/Wish";
import styles from "./Card.module.scss";
import { clearUsers } from "../../redux/actions/users.action";
import { setWishes, changeWishes } from "../../redux/actions/wishes.action";
import { Api } from "../../core/api/api";

interface CardProp {
  handleRandomElement(arg: any): void;
  clearUsers: () => void;
  setWishes: (wishes: Wish[]) => void;
  changeWishes: (wish: Wish) => void;
  wishes: Wish[];
}

const Card: React.FC<CardProp> = ({
  handleRandomElement,
  clearUsers,
  setWishes,
  wishes,
  changeWishes,
}) => {
  const [employee, setEmployee] = useState<string>("");

  useEffect((): void => {
    clearUsers();
    Api.getWishes()
      .then((res) => {
        setWishes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [clearUsers, setWishes, changeWishes]);
  const wishElement = [
    {
      _id: "5fe1a62b4aa8b5f75f3b41b5",
      text:
        "Не каждый может быть твоим другом, но каждый может быть твоим учителем.",
      isGift: false,
      count: 1,
    },
  ];

  const generateResult = (e: any) => {
    setEmployee("");
    const wishesAndGifts = wishes.filter(
      (item) => item.count && item.count > 0
    ) || [wishElement];
    const wish =
      wishesAndGifts[Math.floor(Math.random() * wishesAndGifts.length)];
    Api.setUser({ name: employee, text: wish.text, isGift: wish.isGift })
      .then((res) => {
        console.log("user set");
        handleRandomElement(wish);
        // if (wish.isGift) {
        sendMail(employee, wish);
        // }
        const newCount = wish.count ? --wish.count : 0;
        Api.changeWish({ id: wish._id, count: newCount });
      })
      .catch((e) => {
        const wish = {
          _id: "test",
          text: "Спасибо за участие.",
          isGift: false,
        };
        handleRandomElement(wish);
      });
    e.preventDefault();
  };

  const sendMail = (employee: string, randomElement: Wish) => {
    let { text } = randomElement;
    text = `${employee}: ${text}`;
    Api.sendMail({ text: text }).then((resData) => {
      if (resData.status === 200) {
        setEmployee("");
      } else {
        console.log(resData);
      }
    });
  };

  const handleChange = (e: any) => {
    setEmployee(e.target.value);
  };

  return (
    <div className={styles.Card}>
      <div className={styles.Content}>
        <h1 className={styles.Title}>
          С наступающим <br />
          Новым Годом!
        </h1>
        <p className={styles.Text}>
          Пусть новый год будет наполнен достижениями, богатством, <br />
          любовью и здоровьем! Желаем вам мира, благополучия и счастья,
          <br /> пусть в Новом Году всё получится, и задуманное сбудется!
        </p>
        <p className={styles.TextBold}>
          Предлагаем вам принять участие в моментальной <br />
          лотерее, у вас есть возможность получить предсказание <br />
          на будущий год, пожелание или приятный подарок!
        </p>
        <form onSubmit={generateResult} className={styles.Form}>
          <div>
            <input
              name="employee"
              type="text"
              required
              className={styles.Input}
              value={employee}
              onChange={handleChange}
              placeholder="Пожалуйста введите свою фамилию и имя"
            />
          </div>
          <button
            type="submit"
            className={styles.Button}
            onChange={generateResult}
          >
            Участвовать!
          </button>
        </form>
        <div className={styles.Logo} />
      </div>
    </div>
  );
};

// @ts-ignore
export default connect((state: any) => ({ wishes: state.wishesReducer }), {
  clearUsers,
  setWishes,
  changeWishes,
})(Card);
