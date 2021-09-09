import { useState, useEffect } from "react";

import axios, { AxiosResponse, AxiosError } from "axios";
import apiLink from "../../api";

import IArtist, { EmptyArtist } from "../../interfaces/Artist";
import IMedia, { EmptyMedia } from "../../interfaces/Media";

import { useForm, SubmitHandler } from "react-hook-form";

import MediaForm from "../forms/MediaForm";

interface IProps {
  _id?: string;
}

const ArtistForm: React.FC<IProps> = ({ _id }) => {
  const [artist, setArtist] = useState<IArtist>();
  const [media, setMedia] = useState<IMedia[]>(new Array<IMedia>(EmptyMedia));

  const { register, handleSubmit } = useForm<IArtist>();

  // Initialize the form values
  useEffect(() => {
    const initialize = async () => {
      console.log("Initializing artist form...");

      let exists: boolean = false;

      // Get artist if ID exists
      if (_id) {
        // Fetch artist data
        const artistResponse: AxiosResponse<IArtist> = await axios.get(
          `${apiLink}/artists/${_id}`
        );

        // Return if artist data is null
        if (artistResponse.data == null) return;

        // If not null, you can say the artist exists
        exists = true;

        // Set state of artist to fetched data
        setArtist(artistResponse.data);

        // Create media array
        let mediaArray: IMedia[] = new Array<IMedia>();

        // Loop through media items to get the actual media information
        artistResponse.data.media?.forEach(async (media) => {
          // Fetch media data from database
          const mediaResponse: AxiosResponse<IMedia> = await axios.get(
            `${apiLink}/media/${media.mediaId}`
          );

          // Push new media data to media array
          mediaArray.push(mediaResponse?.data);
        });

        if (mediaArray.length === 0) mediaArray.push(EmptyMedia);

        // Set the new media array in the media state
        setMedia(mediaArray);
      }

      if (!exists) {
        setArtist(EmptyArtist);
      }
    };

    initialize();
  });

  const onSubmit: SubmitHandler<IArtist> = (data) => {
    // Create array out of media ID's
    const mediaIdArray: Array<string> = media!.map(
      (m) => m._id
    ) as Array<string>;

    // Set media to newly created array
    data.media = mediaIdArray.map((m) => {
      return { mediaId: m };
    });

    console.log("Sending following data");
    console.log(data);

    // Send artist to back-end
    axios
      .post(`${apiLink}/artists`, data)
      .then((response: AxiosResponse<IArtist>) => {
        alert(`Successfully added artist ${response.data.name}`);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const addMedia = (m: IMedia) => {
    // Log message to console
    console.log(`Adding media with ID ${m._id}`);

    // Add new media array
    let newMedia: IMedia[] = media!;

    // Remove last media item (which is empty)
    newMedia.pop();

    // Add new media item
    newMedia.push(m);

    console.log(newMedia);

    // Set media array state to the new array
    setMedia(newMedia);
  };

  return (
    <div>
      <form id="artistForm" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input
            {...register("name")}
            id="artistName"
            type="text"
            name="name"
            defaultValue={artist?.name}
          />
        </label>
        <label>
          Bio
          <textarea
            {...register("bio")}
            id="artistBio"
            name="bio"
            defaultValue={artist?.bio}
          />
        </label>
        <label>
          Submit
          <input id="submitArtist" type="submit" />
        </label>
      </form>
      {media?.map((m) => {
        return (
          <MediaForm
            media={m}
            onMediaSubmit={(media: IMedia) => addMedia(media)}
          />
        );
      })}
      <button
        onClick={() => {
          addMedia(EmptyMedia);
        }}
      >
        Add media
      </button>
    </div>
  );
};

export default ArtistForm;
