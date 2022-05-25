import { useRouter } from 'next/router';

const SectionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Instructor id: {id}</p>;
};

export default SectionPage;
