import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const { error } = await createPost({ input: values });
            if (!error) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="title" label="Title" />
              <Box mt={4}>
                <InputField
                  textarea
                  name="text"
                  placeholder="text..."
                  label="Body"
                />
              </Box>

              <Button
                isLoading={isSubmitting}
                mt={4}
                type="submit"
                colorScheme="blue"
                color="white"
              >
                Create Post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
