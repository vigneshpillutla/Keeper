import { useAuth } from 'providers/AuthProvider';
import styles from 'stylesheets/Loading.module.css';
const Loading = (props) => {
  const { dots = 4 } = props;
  const {
    sessionData: { loading }
  } = useAuth();
  if (!loading) return null;
  return (
    <div className={styles['loader']}>
      {Array.from({ length: dots }, (elem, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${i / 10}s`
          }}
        ></span>
      ))}
    </div>
  );
};

const FullScreenLoader = (props) => {
  const {
    sessionData: { loading }
  } = useAuth();
  if (!loading) return null;
  return (
    <div className={styles['fullscreen']}>
      <Loading {...props} />
    </div>
  );
};

export { Loading, FullScreenLoader };
