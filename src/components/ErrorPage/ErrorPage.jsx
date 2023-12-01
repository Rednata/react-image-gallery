import style from './ErrorPage.module.css';

export const ErrorPage = () => {
  console.log();
  return (
    <div className={style.container}>
      <p className={style.content}>
        Превышен лимит запросов.
      </p>
      <p className={style.content}>
        Пожалуйста, вернитесь позже
      </p>
    </div>
  );
};

