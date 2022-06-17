// @ts-nocheck
import { useEffect } from 'react';
import type { NextPage } from 'next';
import {
  Card,
  Image as Img,
  Item,
  Label,
  Icon,
  Divider,
  Button,
  Loader,
} from 'semantic-ui-react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../redux/types';
import { mainAction } from '../redux/actions/mainAction';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

const UserPage: NextPage = () => {
  const dispatch = useDispatch();
  const resData = useSelector((store: any) => store?.userProfile?.userProfile);
  const reposData = useSelector((store: any) => store?.userRepo?.userRepo);
  const router = useRouter();
  const { userLogin } = router?.query;
  useEffect(() => {
    if (userLogin) {
      dispatch(
        mainAction(
          'get',
          'https://api.github.com/users/',
          `${userLogin}`,
          types.USER_PROFILE
        )
      );
    }
  }, [userLogin]);

  useEffect(() => {
    if (resData?.data?.login) {
      dispatch(
        mainAction('get', resData?.data?.repos_url, '', types.USER_REPO, {})
      );
    }
  }, [resData]);

  return (
    <div className={`${styles.container} ${styles.profileContainer}`}>
      <Head>
        <title>github profile</title>
        <meta
          name="description"
          content={`${resData?.data?.login}'s github profile`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={styles.userProfileMain}
        style={{
          display: 'flex',
          alignSelf: 'center',
          justifySelf: 'center',
        }}
      >
        <section className="profile-section">
          <Button
            onClick={() => router.push('/')}
            content="Back to GitHub username search"
            icon="arrow left"
            labelPosition="left"
          />
          {resData?.data?.login ? (
            <>
              <Item.Group>
                <Item>
                  <Img
                    size="small"
                    src={resData?.data?.avatar_url}
                    style={{ borderRadius: '10px' }}
                  />
                  <Item.Content>
                    <Item.Header>{resData?.data?.login}</Item.Header>
                    <Item.Description>{resData?.data?.name}</Item.Description>
                    <Item.Meta>bio: {resData?.data?.bio || '...'}</Item.Meta>
                    <Item.Meta>Followers: {resData?.data?.followers}</Item.Meta>
                    <Item.Meta>Following: {resData?.data?.following}</Item.Meta>
                    <Item.Extra>
                      <a
                        href={`${resData?.data?.html_url}`}
                        // target={'_blank'}
                        rel="GitHub profile"
                      >
                        <Icon name="github" size="large" color="black" />
                      </a>

                      {resData?.data?.location && (
                        <Label icon="point" content={resData?.data?.location} />
                      )}
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </>
          ) : resData?.data?.isLoading ? (
            <Loader active inline="centered">
              Loading...
            </Loader>
          ) : (
            <></>
          )}

          <section>
            {reposData?.data.isLoading ? (
              <Loader active inline="centered">
                Loading...
              </Loader>
            ) : reposData?.data?.length ? (
              <>
                <Divider horizontal>
                  <a
                    href={`${resData?.data?.html_url}?tab=repositories`}
                    // target={'_blank'}
                    rel="repository"
                    className={styles.urlCard}
                  >
                    <Label
                      icon="folder"
                      size="large"
                      content={`${reposData?.data?.length} Repositories`}
                    />
                  </a>
                </Divider>
                <Card.Group
                  style={{
                    justifyContent: 'space-evenly',
                  }}
                >
                  {reposData?.data.isLoading ? (
                    <Loader active inline="centered">
                      Loading...
                    </Loader>
                  ) : reposData?.data?.length ? (
                    reposData?.data?.map((el: any) => (
                      <a
                        href={`${resData?.data?.html_url}?tab=repositories`}
                        // target={'_blank'}
                        rel="repository"
                        className={styles.urlCard}
                        key={el?.name}
                      >
                        <Card>
                          <Card.Content>
                            <Card.Header
                              style={{
                                wordBreak: 'break-all',
                              }}
                            >
                              {el?.name}
                            </Card.Header>
                            <Card.Meta>{el?.description}</Card.Meta>
                            <Card.Description>
                              Size: {el?.size}
                            </Card.Description>
                            <Label
                              content={el?.visibility}
                              circular
                              color={
                                el?.visibility === 'public' ? 'green' : 'yellow'
                              }
                            />
                            {el?.license?.key && (
                              <Label>{el?.license?.name}</Label>
                            )}
                          </Card.Content>
                        </Card>
                      </a>
                    ))
                  ) : (<></>)}
                </Card.Group>
                <Divider horizontal>
                  <a
                    href={`${resData?.data?.html_url}?tab=repositories`}
                    // target={'_blank'}
                    rel="repository"
                    className={styles.urlCard}
                  >
                    <Label
                      icon="folder"
                      size="large"
                      content={`${reposData?.data?.length} Repositories`}
                    />
                  </a>
                </Divider>
              </>
            ) : (
              <></>
            )}
            {!reposData?.data.isLoading && !reposData?.data?.length ? (
              <Divider horizontal>
                <Label
                  icon="folder"
                  size="large"
                  content={`No Repositories found`}
                />
              </Divider>
            ) : (
              <></>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserPage;
