import Logo from '@/../public/logo-oca-simple.svg';
import { HeaderModal, LogoImage, MainHeader, Wrapper } from './HeaderSection.styles';
import Header from '../Header';


const HeaderSection = () => {

    return (
        <Wrapper>
            <HeaderModal><Header/></HeaderModal>
            <LogoImage src={Logo} alt="" />
            <MainHeader />
        </Wrapper>
    );
};

export default HeaderSection;