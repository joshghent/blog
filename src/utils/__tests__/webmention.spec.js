/* eslint-disable react/jsx-filename-extension */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import WebMentions from "../webmentions";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        links: [
          {
            source:
              "https://brid.gy/like/twitter/joshghent/1479394743528349696/133487462",
            verified: true,
            verified_date: "2022-01-08T05:31:24+00:00",
            id: 1328284,
            private: false,
            data: {
              author: {
                name: "Graham : A Star Wars Story 💙",
                url: "https://twitter.com/whoisgraham",
                photo:
                  "https://pbs.twimg.com/profile_images/2907221110/712dfcecc7fd591915d1355bdbe4adcd.jpeg",
              },
              url: "https://twitter.com/joshghent/status/1479394743528349696#favorited-by-133487462",
              name: null,
              content: null,
              published: null,
              published_ts: null,
            },
            activity: {
              type: "like",
              sentence:
                "Graham : A Star Wars Story 💙 favorited a tweet https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="https://twitter.com/whoisgraham">Graham : A Star Wars Story 💙</a> favorited a tweet <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            target: "https://joshghent.com/how-you-work/",
          },
          {
            source:
              "https://unicoreofficial.com/2-critical-elements-for-every-professional-development-plan-jibberjobber-blog/",
            verified: true,
            verified_date: "2022-02-03T08:24:16+00:00",
            id: 1345346,
            private: false,
            data: {
              url: "https://unicoreofficial.com/2-critical-elements-for-every-professional-development-plan-jibberjobber-blog/",
              name: null,
              content: null,
              published: null,
              published_ts: null,
            },
            activity: {
              type: "link",
              sentence:
                "https://unicoreofficial.com/2-critical-elements-for-every-professional-development-plan-jibberjobber-blog/ posted '' linking to https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="https://unicoreofficial.com/2-critical-elements-for-every-professional-development-plan-jibberjobber-blog/">someone</a> posted \'\' linking to <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            rels: {
              canonical:
                "https://unicoreofficial.com/2-critical-elements-for-every-professional-development-plan-jibberjobber-blog/",
            },
            target: "https://joshghent.com/how-you-work/",
          },
          {
            source:
              "https://blog.jibberjobber.com/2022/02/03/professional-development-plan/",
            verified: true,
            verified_date: "2022-02-03T08:39:19+00:00",
            id: 1345365,
            private: false,
            data: {
              url: "https://blog.jibberjobber.com/2022/02/03/professional-development-plan/",
              name: null,
              content: null,
              published: null,
              published_ts: null,
            },
            activity: {
              type: "link",
              sentence:
                "https://blog.jibberjobber.com/2022/02/03/professional-development-plan/ posted '' linking to https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="https://blog.jibberjobber.com/2022/02/03/professional-development-plan/">someone</a> posted \'\' linking to <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            rels: {
              canonical:
                "https://blog.jibberjobber.com/2022/02/03/professional-development-plan/",
            },
            target: "https://joshghent.com/how-you-work/",
          },
          {
            source:
              "https://crazyboy.tech/2-critical-elements-for-every-professional-development-plan/",
            verified: true,
            verified_date: "2022-02-18T15:48:40+00:00",
            id: 1345665,
            private: false,
            data: {
              url: "https://crazyboy.tech/2-critical-elements-for-every-professional-development-plan/",
              name: null,
              content: null,
              published: null,
              published_ts: null,
            },
            activity: {
              type: "link",
              sentence:
                "https://crazyboy.tech/2-critical-elements-for-every-professional-development-plan/ posted '' linking to https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="https://crazyboy.tech/2-critical-elements-for-every-professional-development-plan/">someone</a> posted \'\' linking to <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            target: "https://joshghent.com/how-you-work/",
          },
          {
            source: "http://voiceofthedba.com/2022/04/15/your-user-manual/",
            verified: true,
            verified_date: "2022-04-15T14:43:24+00:00",
            id: 1381692,
            private: false,
            data: {
              url: "http://voiceofthedba.com/2022/04/15/your-user-manual/",
              name: null,
              content: null,
              published: null,
              published_ts: null,
            },
            activity: {
              type: "link",
              sentence:
                "http://voiceofthedba.com/2022/04/15/your-user-manual/ posted '' linking to https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="http://voiceofthedba.com/2022/04/15/your-user-manual/">someone</a> posted \'\' linking to <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            rels: {
              canonical:
                "https://voiceofthedba.com/2022/04/15/your-user-manual/",
            },
            target: "https://joshghent.com/how-you-work/",
          },
          {
            source:
              "https://brid.gy/comment/twitter/joshghent/1479394743528349696/1479486822711496711",
            verified: true,
            verified_date: "2022-01-08T05:31:51+00:00",
            id: 1328285,
            private: false,
            data: {
              author: {
                name: "Graham : A Star Wars Story 💙",
                url: "https://twitter.com/whoisgraham",
                photo:
                  "https://pbs.twimg.com/profile_images/2907221110/712dfcecc7fd591915d1355bdbe4adcd.jpeg",
              },
              url: "https://twitter.com/whoisgraham/status/1479486822711496711",
              name: null,
              content: null,
              published: "2022-01-07T16:15:20+00:00",
              published_ts: 1641572120,
            },
            activity: {
              type: "reply",
              sentence:
                "Graham : A Star Wars Story 💙 replied '' to a tweet https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="https://twitter.com/whoisgraham">Graham : A Star Wars Story 💙</a> replied \'\' to a tweet <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            target: "https://joshghent.com/how-you-work/",
          },
          {
            source:
              "https://brid.gy/post/twitter/joshghent/1483502814710177795",
            verified: true,
            verified_date: "2022-01-18T22:05:06+00:00",
            id: 1334535,
            private: false,
            data: {
              author: {
                name: "way0utwest 🎙️ (He/Him/His)",
                url: "https://twitter.com/way0utwest",
                photo:
                  "https://pbs.twimg.com/profile_images/1403381266439831557/pgatSITi.png",
              },
              url: "https://twitter.com/way0utwest/status/1483502814710177795",
              name: null,
              content:
                'The personal user manual, intersting to think about. I find a lot of this one applies to me : <a href="https://joshghent.com/how-you-work/">joshghent.com/how-you-work/</a>\n\nFrom <a href="https://twitter.com/BrentOzarULTD">@BrentOzarULTD</a>',
              published: "2022-01-18T18:13:27+00:00",
              published_ts: 1642529607,
            },
            activity: {
              type: "link",
              sentence:
                "way0utwest 🎙️ (He/Him/His) posted 'The personal user manual, intersting to think about. I find a lot of this one ap...' linking to https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="https://twitter.com/way0utwest">way0utwest 🎙️ (He/Him/His)</a> posted \'The personal user manual, intersting to think about. I find a lot of this one ap...\' linking to <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            target: "https://joshghent.com/how-you-work/",
          },
          {
            source:
              "https://brid.gy/post/twitter/joshghent/1489287818606088192",
            verified: true,
            verified_date: "2022-02-03T20:40:02+00:00",
            id: 1345825,
            private: false,
            data: {
              author: {
                name: "Jason Alba",
                url: "https://twitter.com/jasonalba",
                photo:
                  "https://pbs.twimg.com/profile_images/983477975973638144/GZn4D0_P.jpg",
              },
              url: "https://twitter.com/jasonalba/status/1489287818606088192",
              name: null,
              content:
                'Had <a href="https://twitter.com/joshghent">@joshghent</a>\'s brilliant post (<a href="https://joshghent.com/how-you-work/">joshghent.com/how-you-work/</a>) up for a couple weeks. His post is totally worth your time.\n\nI wrote about it, and another superpower, here: \n\n<a href="https://blog.jibberjobber.com/2022/02/03/professional-development-plan/">blog.jibberjobber.com/2022/02/03/pro…</a>',
              published: "2022-02-03T17:21:00+00:00",
              published_ts: 1643908860,
            },
            activity: {
              type: "link",
              sentence:
                "Jason Alba posted 'Had @joshghent's brilliant post (joshghent.com/how-you-work/) up for a couple we...' linking to https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="https://twitter.com/jasonalba">Jason Alba</a> posted \'Had @joshghent\'s brilliant post (joshghent.com/how-you-work/) up for a couple we...\' linking to <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            target: "https://joshghent.com/how-you-work/",
          },
          {
            source:
              "https://brid.gy/post/twitter/joshghent/1502738514307342340",
            verified: true,
            verified_date: "2022-03-12T20:12:47+00:00",
            id: 1362586,
            private: false,
            data: {
              author: {
                name: "Ann",
                url: "https://twitter.com/Aniuchaaja",
                photo:
                  "https://pbs.twimg.com/profile_images/1504790490/jaIMG_4305.jpg",
              },
              url: "https://twitter.com/Aniuchaaja/status/1502738514307342340",
              name: null,
              content:
                'How You Work\n<a href="https://joshghent.com/how-you-work/">joshghent.com/how-you-work/</a>',
              published: "2022-03-12T20:09:15+00:00",
              published_ts: 1647115755,
            },
            activity: {
              type: "link",
              sentence:
                "Ann posted 'How You Work joshghent.com/how-you-work/' linking to https://joshghent.com/how-you-work/",
              sentence_html:
                '<a href="https://twitter.com/Aniuchaaja">Ann</a> posted \'How You Work joshghent.com/how-you-work/\' linking to <a href="https://joshghent.com/how-you-work/">https://joshghent.com/how-you-work/</a>',
            },
            target: "https://joshghent.com/how-you-work/",
          },
        ],
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("Webmentions", () => {
  it("renders webmentions for a blog post", () => {
    const container = render(<WebMentions url="/how-you-work/" />);
    expect(container).toMatchSnapshot();
  });
});
