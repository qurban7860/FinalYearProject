
import { motion } from 'framer-motion';
import { github, phone, linkedin } from '../assets';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../Animation/motion';

const ContactCard = ({ title, icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className="w-16 h-16 bg-tertiary rounded-full flex justify-center items-center m-2">
      <img src={icon} alt={title} className="w-8 h-8 object-contain" />
    </div>
  </a>
);

const About = () => {
  return (
    <>
      <div className='flex justify-end items-center mt-0 mb-10'>
        <ContactCard title="Phone" icon={phone} link="tel:+923085651015" />
        <ContactCard title="GitHub" icon={github} link="https://github.com/qurban7860" />
        <ContactCard title="LinkedIn" icon={linkedin} link="https://www.linkedin.com/in/qurban-hanif-861064199" />
      </div>

      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>ICE AGE</h2>
        <p className={styles.sectionSubText}>Introduction</p>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-secondary text-[17px] w-full leading-[30px]'
      >
        ISLAMABAD -Several parts of northern Pakistan, particularly the Upper Chitral as well as the Neelum Valley wore a white sheet after the season’s first snowfall that plummeted the temperatures below the freezing point in several areas on Christmas day. Areas of Upper Chitral including Neelum Valley were reeling under biting cold. Gilgit Baltistan and upper Khayber are likely to have rain and snowfalls. The temperature dropped further following the first snowfall of the season, a report aired by a private news channel reported. mas community come to enjoy the snowfalls in the Northern and upper areas of Khyber Pakhtunkhwa. Land, trees and mountains were seen covered with snow which was extremely bewitching for residents and tourists alike, a resident of the area said.
      </motion.p>
    </>
  );
};


export default SectionWrapper( About, 'about');


