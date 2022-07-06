import React, { useState, useEffect } from "react";
import { Heart, MessageCircle } from "react-feather";

export const loadWebMentionCounts = async (target) => {
  return fetch(`https://webmention.io/api/count.json?target=${target}`)
    .then((res) => res.json())
    .then((res) => res.type);
};

export const loadWebMentions = async (target, page = 0) => {
  return fetch(
    `https://webmention.io/api/mentions?page=${page}&per-page=20&sort-dir=up&sort-by=published&target=${target}`
  )
    .then((res) => res.json())
    .then((json) => (Array.isArray(json.links) ? json.links : []));
};

export default function WebMentions({ url }) {
  const fullUrl = `https://joshghent.com${url}`;
  const [type, setType] = useState({});
  const [page, setPage] = useState(0);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const twitterHref = `https://twitter.com/intent/tweet/?text=Great%20post%20by%20@joshghent%20${fullUrl}`;

  useEffect(() => {
    async function loadPage() {
      loadWebMentions(fullUrl, page).then((returnedLinks) => {
        setLoading(false);
        setLinks((links) => links.concat(returnedLinks));

        if (returnedLinks.length === 20) {
          setPage(page + 1);
        }
      });
    }

    loadPage();
  }, [url, page]);

  useEffect(() => {
    const fullUrl = `https://joshghent.com${url}`;
    loadWebMentionCounts(fullUrl).then((data) => setType(data));
  }, [url]);

  function renderMentions() {
    return links.map((link, index) => {
      if (link.activity.type === "reply" || link.activity.type === "link") {
        console.log(link);
        let date = new Date(link.data.published ?? link.verified_date);
        date = new Intl.DateTimeFormat("en-US").format(date);
        return (
          <div className="webmention--item" key={index}>
            <div className="webmention--meta">
              <a href={link.data.url}>
                {link.data.author?.photo && (
                  <img
                    alt=""
                    className="webmention--image"
                    src={link.data.author?.photo}
                  />
                )}{" "}
              </a>
              <div>
                <strong>{link.data.author?.name || link.data.url}</strong> -{" "}
                {date}
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: link.data.content }} />
          </div>
        );
      } else {
        return [];
      }
    });
  }

  function renderLikes() {
    if (loading) {
      return <div>Loading webmentions...</div>;
    } else if (!loading && links.length === 0) {
      return "";
    } else if (!loading) {
      return links.map((link, index) => {
        if (link.activity.type === "like") {
          let date = new Date(link.data.published ?? link.verified_date);
          date = new Intl.DateTimeFormat("en-US").format(date);
          return (
            <div className="webmention--item" key={index}>
              <div className="webmention--meta">
                <a href={link.data.url}>
                  {link.data.author?.photo && (
                    <img
                      alt=""
                      className="webmention--image"
                      src={link.data.author?.photo}
                    />
                  )}{" "}
                </a>
              </div>
            </div>
          );
        } else return "";
      });
    }
  }

  function renderContent() {
    if (loading) {
      return <div>Loading Webmentions...</div>;
    } else if (!loading && links.length === 0) {
      return (
        <div>
          No replies yet! Tweet about <a href={twitterHref}>this post</a> and it
          will show up here!
        </div>
      );
    } else if (!loading) {
      return renderMentions();
    } else {
      return null;
    }
  }

  const likesCount = type.like || 0 + type.repost || 0;
  const replyCount = type.mention || 0 + type.reply || 0;
  return (
    <div>
      <div className="webmention--header">
        <h3>Webmentions</h3>
        <span>
          {likesCount} Like{likesCount !== 0 && likesCount > 1 ? "s" : ""}
        </span>
        <ol className="webmention--likes">{renderLikes()}</ol>
      </div>
      <span>
        {replyCount} Repl{replyCount === 0 || replyCount > 1 ? "ies" : ""}
      </span>
      <ol className="webmention--replies">{renderContent()}</ol>
    </div>
  );
}
