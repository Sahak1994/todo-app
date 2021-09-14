import {ChangeLangPrvider} from 'context/change-lang-context';

const Auxiliay = (props) => {

  return (
    <ChangeLangPrvider>
      {props.children}
    </ChangeLangPrvider>
  );

}

export default Auxiliay;
