import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl, { Label, HelpText } from '@codeday/topo/Molecule/FormControl'
import Image from '@codeday/topo/Atom/Image';
import Box from '@codeday/topo/Atom/Box';
import Text from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import { UnlinkDiscordMutation } from './Discord.gql'
import { tryAuthenticatedApiQuery } from '../../util/api';
import { useRouter } from 'next/router'
import { useToasts } from '@codeday/topo/utils';
import Link from '@codeday/topo/Atom/Text/Link';

const unlinkDiscord = async (token) => {
  const { error } = await tryAuthenticatedApiQuery(UnlinkDiscordMutation, {}, token)
  return !error ? true : false
};

const Discord = ({ user, token }) => {
  const [isLinked, setIsLinked] = useState(user.discordId ? true : false)
  const router = useRouter()
  const { success } = useToasts();
  const picture = user?.discordInformation?.avatar.endsWith("null") ? `https://cdn.discordapp.com/embed/avatars/${user.discordInformation.discriminator%5}.png` : user?.discordInformation?.avatar || null
  return (
    <FormControl>
      <Label fontWeight="bold">Discord Information</Label>
      {isLinked ? 
      <Box>
        <Box style={{ clear: 'both', display: "flex", alignItems: "center"}}>
          <Image mb={2} src={picture} alt="" float="left" mr={2} height="2em" rounded="full" /> <Text fontSize="1em">{user.discordInformation.handle}</Text>
        </Box>
        <Button
        size="xs"
        marginRight="3"
        as="a"
        onClick={async () => {
            await unlinkDiscord(token); 
            setIsLinked(false);
            success("Unlinked Discord Account!")
          }}>
          Unlink Discord account
        </Button>
        <HelpText>
          Your account is linked and ready! Make sure you are in the <Link href="https://discord.gg/codeday">CodeDay Discord Server</Link>!
        </HelpText>
      </Box>
      : <Box>
          <Button onClick={() => 
              router.push("/api/discord/link")
            }>
            Link Discord
          </Button>
          <HelpText>
            Link your Discord account to get full access to the <Link href="https://discord.gg/codeday">CodeDay Discord Server</Link>.
          </HelpText>
        </Box>}
    </FormControl>
  );
};
Discord.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};
Discord.provides = "discord";
export default Discord;
