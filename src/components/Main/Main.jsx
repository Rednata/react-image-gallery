import style from './Main.module.css';
import List from './List';

export const Main = () => {
  console.log();

  return (
    <main className={style.container}>
      <List ></List>
    </main>);
};

