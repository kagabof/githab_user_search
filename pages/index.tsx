// @ts-nocheck
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import {
  Card,
  Image as Img,
  Grid,
  Search,
  SearchProps,
  Icon,
  Button,
  Loader,
} from 'semantic-ui-react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../redux/types';
import { mainAction } from '../redux/actions/mainAction';
import creator from '../redux/actions/creator';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  const [queryString, setQueryString] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const resData = useSelector((store: any) => store?.usersList?.usersList);
  const searchQueryList = useSelector(
    (store: any) => store?.searchList?.searchList
  );

  const addSearchQuery = (query: string) => {
    dispatch(creator(types.SEARCH_LIST, query));
  };
  const updateSearch = (value: string) => {
    setQueryString(value);
    setTimeout(async () => {
      dispatch(
        mainAction(
          'get',
          'https://api.github.com/search/users',
          `?q=${value}`,
          types.SEARCH_USERS
        )
      );
    }, 700);
  };

  const handleSearchResults = (query: string) => {
    setSearchSuggestions(
      searchQueryList?.filter(
        (el: string) =>
          el?.toLocaleLowerCase()?.search(query?.toLocaleLowerCase()) > -1
      )
    );
  };

  useEffect(() => {
    if (!queryString) {
      setSearchSuggestions(searchQueryList);
    }
  }, [searchQueryList]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();

        if (queryString) {
          updateSearch(queryString);
        }
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>github user search</title>
        <meta name="description" content="Search all users on GitHub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to GitHub Search.</h1>
        <Grid>
          <Grid.Column width={6}>
            <Search
              fluid
              onResultSelect={(e, data) => {
                router.push(`/${data?.result?.title}`);
              }}
              size="huge"
              onSearchChange={(e, data: SearchProps) => {
                if (data?.value) {
                  setQueryString(data?.value);
                  handleSearchResults(data?.value);
                }
              }}
              icon={
                <span
                  style={{
                    position: 'relative',
                    alignSelf: 'center',
                    cursor: 'pointer',
                    right: 35,
                  }}
                  onClick={() =>
                    queryString ? updateSearch(queryString) : null
                  }
                >
                  {resData?.data?.isLoading ? (
                    <Loader active inline />
                  ) : (
                    <Icon
                      name="search"
                      color={queryString ? 'black' : 'grey'}
                    />
                  )}
                </span>
              }
              results={searchSuggestions?.map((el) => ({
                title: el,
                description: '',
              }))}
              placeholder="Search..."
              loading={resData?.data?.isLoading}
              style={{
                width: '100%',
              }}
              button={
                <Button icon>
                  <Icon name="world" />
                </Button>
              }
            />
          </Grid.Column>
        </Grid>
        <Loader
          size="small"
          style={{ border: '1px solid red', zIndex: '30px' }}
        >
          Loading
        </Loader>

        <p className={styles.description}>
          {resData?.data?.total_count ? (
            `${resData?.data?.total_count} Users found with username ${queryString}`
          ) : (
            <>
              <span>
                <Icon name="keyboard outline" />
                {'Type a GitHub username! 🔍  💻 👌🏾'}
              </span>
              <br />
              <span>Example: kagabof</span>
            </>
          )}
        </p>

        <section className="section-1">
          <Card.Group
            className="section-1"
            style={{
              justifyContent: 'space-evenly',
            }}
          >
            {resData?.data?.items?.map((el: any) => (
              <a
                href={`/${el?.login}`}
                className={styles.urlCard}
                onClick={() => addSearchQuery(el?.login)}
                key={el?.login}
              >
                <Card link>
                  <Card.Content>
                    <Img
                      floated="right"
                      size="small"
                      src={el?.avatar_url}
                      avatar
                      alt={`${el?.login} github profile`}
                    />
                    <Card.Header>{el?.login}</Card.Header>
                    <Card.Meta>Type: {el?.type}</Card.Meta>
                    <Card.Description>Score: {el?.score}</Card.Description>
                  </Card.Content>
                </Card>
              </a>
            ))}
          </Card.Group>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
