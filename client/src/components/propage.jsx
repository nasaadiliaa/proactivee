import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  text-align: center;
  padding: 7em;
  background-color: #fff;
`;

const Image = styled.img`
  width: 582px;
  height: 476px;
`;

const Paragraph = styled.p`
  font-size: 20px;
  margin-top: 1em;
  line-height: 1.5;
`;

const ProPage = () => {
  return (
    <Section>
      <Image src="/img/assets/svg/gambar1.svg" alt="ProPage Image" />
      <Paragraph>
        Fokus pada satu daftar yang terstruktur rapi agar semua tujuanmu tercapai dengan efisien <br />
        dan tanpa hambatan. Jadikan hari-harimu lebih produktif bersama ProActive
      </Paragraph>
    </Section>
  );
}

export default ProPage;
