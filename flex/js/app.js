var app = {
    maxBufferPercentage: 15,
    status: "starting",
    installed: !1,
    connected: !1,
    btapp: {},
    player: {
        videojs: {},
        projekktor: {}
    }
};

//-------- start defsoul functions ----\\

function log(str, colour){console.log('%c dbg> ' + str, 'background: #D3D3D3; color: ' + colour);} // CUSTOM LOG

function sendMagnet(mag, mt){ 
    $.post("tget.php", {
      mediaType:  mt,
      magnet:  mag
    })
      .done(function(data) {
       //alert("DAMN SON PHP RESPONSE: " + data); //response from the tget.php
       log(data, "blue");
    });
}

//-------- end defsoul functions ----\\

! function(e) {
    "use strict";
    e.api || (e.api = {}), e = e.api;
    var t = "https://api.themoviedb.org/3/",
        a = "f2d9fc51f6de779fb245cb121166eb5a",
        n = "http://www.opensubtitles.org/en/search/xml/sort-7/asc-0/subformat-srt/sublanguageid-",
        r = "/searchonlymovies-on/moviename-yify/imdbid-",
        i = "https://yts.to/api/v2/",
        s = ["udp://open.demonii.com:1337", "udp://tracker.istole.it:80", "http://tracker.yify-torrents.com/announce", "udp://tracker.publicbt.com:80", "udp://tracker.openbittorrent.com:80", "udp://tracker.coppersurfer.tk:6969", "udp://exodus.desync.com:6969", "http://exodus.desync.com:6969/announce"],
        o = "http://kickass.to/usearch/",
        d = function(e) {
            function t(t) {
                try {
                    var a = t.query.results
                } catch (n) {
                    return console.warn("Invalid JSON data returned"), "function" == typeof e.error && e.error("Invalid JSON data returned", t), void("function" == typeof e.complete && e.complete("Invalid JSON data returned", t))
                }
                try {
                    a = a.postresult
                } catch (n) {
                    return console.warn("No data returned"), "function" == typeof e.error && e.error("No data returned", t), void("function" == typeof e.complete && e.complete("No data returned", t))
                }
                return a ? (a = a.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ""), "function" == typeof e.success && e.success(a), void("function" == typeof e.complete && e.complete(a))) : (console.warn("No data returned"), "function" == typeof e.error && e.error("No data returned", t), void("function" == typeof e.complete && e.complete("No data returned", t)))
            }
            if (!e.url) throw new Error("No URL specified");
            var a = _.map(e.data, function(e, t) {
                return t + "=" + e
            }).join("&");
            _.size(e.data) > 0 && (a = "?" + a);
            var n = encodeURIComponent("select * from jsonpost where url='" + encodeURI(e.url + a).replace(/[!,'()*]/g, "") + "' and postdata=''"),
                r = "http://query.yahooapis.com/v1/public/yql?q=" + n + "&format=json&env=" + encodeURIComponent("store://datatables.org/alltableswithkeys");
            return $.post(r, t).fail(function(t) {
                console.warn("Error connecting to " + e.url), "function" == typeof e.error && e.error("No data returned", t), "function" == typeof e.complete && e.complete("No data returned", t)
            })
        },
        l = function(e) {
            function t(t) {
                try {
                    var a = t.query.results
                } catch (n) {
                    return console.warn("Invalid JSON data returned"), "function" == typeof e.error && e.error("Invalid JSON data returned", t), void("function" == typeof e.complete && e.complete("Invalid JSON data returned", t))
                }
                try {
                    a = a.postresult
                } catch (n) {
                    return console.warn("No data returned"), "function" == typeof e.error && e.error("No data returned", t), void("function" == typeof e.complete && e.complete("No data returned", t))
                }
                return a ? ("function" == typeof e.success && e.success(a), void("function" == typeof e.complete && e.complete(a))) : (console.warn("No data returned"), "function" == typeof e.error && e.error("No data returned", t), void("function" == typeof e.complete && e.complete("No data returned", t)))
            }
            if (!e.url) throw new Error("No URL specified");
            var a = encodeURIComponent("select * from jsonpost where url='" + encodeURI(e.url).replace(/[!,'()*]/g, "") + "' and postdata=''"),
                n = "http://query.yahooapis.com/v1/public/yql?q=" + a + "&format=json&env=" + encodeURIComponent("store://datatables.org/alltableswithkeys");
            return $.post(n, t).fail(function(t) {
                console.warn("Error connecting to " + e.url), "function" == typeof e.error && e.error("No data returned", t), "function" == typeof e.complete && e.complete("No data returned", t)
            })
        },
        p = function(e) {
            if (!e.url) throw new Error("No URL specified");
            var t = _.map(e.data, function(e, t) {
                return t + "=" + e
            }).join("&");
            _.size(e.data) > 0 && (t = "?" + t);
            var a = encodeURIComponent("select content from data.headers where url='" + encodeURI(e.url + t).replace(/[!'()*]/g, "") + "'"),
                n = "http://query.yahooapis.com/v1/public/yql?q=" + a + "&format=json&env=" + encodeURIComponent("store://datatables.org/alltableswithkeys");
            return $.getJSON(n, function(t) {
                try {
                    var a = t.query.results
                } catch (n) {
                    return console.warn("Invalid JSON data returned"), "function" == typeof e.error && e.error("Invalid JSON data returned", t), void("function" == typeof e.complete && e.complete("Invalid JSON data returned", t))
                }
                try {
                    a = a.resources.content.json
                } catch (n) {
                    return console.warn("No data returned"), "function" == typeof e.error && e.error("No data returned", t), void("function" == typeof e.complete && e.complete("No data returned", t))
                }
                return a ? ("function" == typeof e.success && e.success(a), void("function" == typeof e.complete && e.complete(a))) : (console.warn("No data returned"), "function" == typeof e.error && e.error("No data returned", t), void("function" == typeof e.complete && e.complete("No data returned", t)))
            }).fail(function(t) {
                console.warn("Error connecting to " + e.url), "function" == typeof e.error && e.error("No data returned", t), "function" == typeof e.complete && e.complete("No data returned", t)
            })
        },
        c = function(e) {
            var t = {};
            t.imdbId = e.imdb_id, t.tmdbId = e.id, t.title = e.title || "", t.year = (e.release_date || "").split("-")[0], t.description = e.overview || "", t.rating = e.vote_average || "", t.posterImage = "", e.poster_path && (t.posterImage = "http://image.tmdb.org/t/p/w300" + e.poster_path), t.backdropImage = "", e.backdrop_path && (t.backdropImage = "http://image.tmdb.org/t/p/w1280" + e.backdrop_path), t.runtime = "", e.runtime && (t.runtime = e.runtime + "m");
            try {
                t.cast = _.pluck(e.credits.cast.splice(0, 3), "name")
            } catch (a) {
                try {
                    t.cast = [e.credits.cast.name]
                } catch (a) {}
            }
            t.genres = _.pluck(e.genres, "name");
            try {
                t.trailer = e.trailers.youtube[0].source
            } catch (a) {
                try {
                    t.trailer = e.trailers.youtube.source
                } catch (a) {}
            }
            return e.similar_movies && (t.similar = _.map(e.similar_movies.results, function(e) {
                return {
                    tmdbId: e.id
                }
            })), t
        },
        u = function(e) {
            return {
                name: "",
                quality: e.quality,
                seeds: e.seeds,
                peers: e.peers,
                size: e.size_bytes,
                url: "magnet:?xt=urn:btih:" + e.hash + "&tr=" + s.join("&tr=")
            }
        },
        f = function(e) {
            var t = {};
            t.imdbId = e.external_ids.imdb_id, t.tmdbId = e.id, t.title = e.name || "", t.year = (e.first_air_date || "").split("-")[0], t.description = e.overview || "", t.rating = e.vote_average || "", t.posterImage = "", e.poster_path && (t.posterImage = "http://image.tmdb.org/t/p/w300" + e.poster_path), t.backdropImage = "", e.backdrop_path && (t.backdropImage = "http://image.tmdb.org/t/p/w1280" + e.backdrop_path), t.runtime = "";
            try {
                t.runtime = e.episode_run_time[0] + "m"
            } catch (a) {}
            try {
                t.cast = _.pluck(e.credits.cast.splice(0, 3), "name")
            } catch (a) {
                try {
                    t.cast = [e.credits.cast.name]
                } catch (a) {}
            }
            return t.genres = _.pluck(e.genres, "name"), e.seasons.length || (e.seasons = [e.seasons]), t.seasons = _.map(e.seasons, function(e) {
                return {
                    tmdbId: e.id,
                    number: +e.season_number,
                    episodeCount: +e.episode_count
                }
            }), e.similar && (t.similar = _.map(e.similar.results, function(e) {
                return {
                    tmdbId: e.id
                }
            })), t
        },
        v = function(e) {
            var t = {};
            return t.tmdbId = e.id, t.title = e.name || "", t.number = e.episode_number, t.airDate = e.air_date || "", t.description = e.overview || "", t.stillImage = "", e.still_path && (t.stillImage = "http://image.tmdb.org/t/p/w300" + e.still_path), t
        },
        m = function(e) {
            var t = $(e.parents("tr").get(0)).find("td");
            return {
                name: t.find(".torrentname .cellMainLink").text() || "",
                quality: "",
                seeds: $(t.get(-2)).html() || 0,
                peers: $(t.get(-1)).html() || 0,
                size: $(t.get(-5)).html() || "",
                url: e.attr("href") || ""
            }
        },
        h = function(e) {
            var t = {};
            return e = _.pick(e, "keywords", "genre", "sort", "sortOrder", "page"), e.keywords && (t.query_term = e.keywords), e.genre && (t.genre = e.genre), e.sort && (t.sort_by = {
                popularity: "seeds",
                date: "year",
                rating: "rating"
            }[e.sort]), e.sortOrder && (t.order_by = e.sortOrder), e.page && (t.page = e.page), t
        },
        g = function(e) {
            var t, n = {
                api_key: a
            };
            if (e = _.pick(e, "keywords", "genre", "sort", "sortOrder", "page"), "string" == typeof e.keywords && e.keywords.length > 0) t = "search/tv", n.query = e.keywords;
            else {
                t = "discover/tv", e.genre && (n.with_genres = {
                    Action: 28,
                    Adventure: 12,
                    Animation: 16,
                    Comedy: 35,
                    Crime: 80,
                    Documentary: 99,
                    Drama: 18,
                    Family: 10751,
                    Fantasy: 14,
                    Foreign: 10769,
                    History: 36,
                    Horror: 27,
                    Music: 10402,
                    Mystery: 9648,
                    Romance: 10749,
                    "Science Fiction": 878,
                    "TV Movie": 10770,
                    Thriller: 53,
                    War: 10752,
                    Western: 37,
                    "Action & Adventure": 10759,
                    Education: 10761,
                    Kids: 10762,
                    News: 10763,
                    Reality: 10764,
                    "Sci-Fi & Fantasy": 10765,
                    Soap: 10766,
                    Talk: 10767,
                    "War & Politics": 10768
                }[e.genre]), e.sort && (n.sort_by = {
                    popularity: "popularity",
                    date: "first_air_date",
                    rating: "vote_average"
                }[e.sort] + "." + (e.sortOrder || "desc"), "vote_average" !== n.sort_by.split(".")[0] || e.keywords && 0 !== e.keywords.length || (n["vote_count.gte"] = 15));
                var r = new Date,
                    i = r.getUTCMonth() + 1;
                i = 10 > i ? "0" + i : i;
                var s = r.getUTCDate();
                s = 10 > s ? "0" + s : s, n["first_air_date.lte"] = r.getUTCFullYear() + "-" + i + "-" + s
            }
            return e.page && (n.page = e.page), n.api = t, n
        },
        y = function(e, n, r, i) {
            var s = p({
                url: t + "find/" + e,
                type: "GET",
                data: {
                    external_source: "imdb_id",
                    api_key: a
                },
                error: function() {
                    null !== app.queries.get(n) && i && i()
                },
                success: function(t) {
                    if (null !== app.queries.get(n)) {
                        var a = function(e) {
                            return e.length > 0 ? a(e[0]) : e.hasOwnProperty("id") ? (r && r(e.id), !0) : !1
                        };
                        t.movie_results && a(t.movie_results) || t.tv_results && a(t.tv_results) || console.error("Couldn't find movie/show in TheMovieDatabase with the IMDB code", e)
                    }
                }
            });
            app.queries.addToQuery(n, s)
        };
    e.movie = {
        metadata: {
            single: function(n) {
                if (!n.tmdbId) return n.imdbId || (console.error("Invalid API call: No ID provided"), n.success && n.success([])), void y(n.imdbId, n.queryId, function(t) {
                    n.tmdbId = t, e.movie.metadata.single(n)
                }, n.error);
                n.queryId = n.queryId || 0;
                var r = p({
                    url: t + "movie/" + n.tmdbId,
                    type: "GET",
                    data: {
                        append_to_response: "credits,trailers,similar_movies",
                        api_key: a
                    },
                    error: function() {
                        null !== app.queries.get(n.queryId) && n.error && n.error(arguments)
                    },
                    success: function(e) {
                        null !== app.queries.get(n.queryId) && n.success && n.success(c(e))
                    }
                });
                app.queries.addToQuery(n.queryId, r)
            },
            multiple: function() {}
        },
        subtitle: {
            langs: function(e) {
                if (!e.imdbId) return console.error("Invalid API call: No ID provided"), void(e.success && e.success());
                e.queryId = e.queryId || 0;
                var t = "all",
                    a = l({
                        url: n + t + r + e.imdbId,
                        error: function() {
                            null !== app.queries.get(e.queryId) && e.error && e.error(arguments)
                        },
                        success: function(t) {
                            if (null !== app.queries.get(e.queryId)) {
                                try {
                                    var a = t.opensubtitles.search.results.subtitle
                                } catch (n) {
                                    return console.log("no subtitle results..."), void e.success()
                                }
                                a = _.chain(a).filter(function(e) {
                                    return "undefined" != typeof e.IDSubtitle
                                }).groupBy(function(e) {
                                    return e.ISO639.content
                                }).pluck(0).map(function(e) {
                                    return {
                                        lang: e.ISO639.content,
                                        label: e.LanguageName,
                                        url: "http://www.opensubtitles.org" + e.IDSubtitle.Link + "/xml"
                                    }
                                }).value(), _.each(a, function(t) {
                                    var a = l({
                                        url: t.url,
                                        success: function(a) {
                                            if (null !== app.queries.get(e.queryId)) try {
                                                var n = a.opensubtitles.SubBrowse.Subtitle.SubtitleFile.File.ID,
                                                    r = "http://dl.opensubtitles.org/en/download/file/" + n;
                                                "undefined" != typeof n && e.success(t.label, t.lang, r)
                                            } catch (i) {}
                                        }
                                    });
                                    app.queries.addToQuery(e.queryId, a)
                                })
                            }
                        }
                    });
                app.queries.addToQuery(e.queryId, a)
            }
        },
        torrent: {
            single: function(e) {
                e.ytsId || (console.error("Invalid API call: No ID provided"), e.success && e.success(!1)), e.queryId = e.queryId || 0;
                var t = p({
                    url: i + "movie_details.json?movie_id=" + e.ytsId,
                    error: function() {
                        null !== app.queries.get(e.queryId) && e.error && e.error(arguments)
                    },
                    success: function(t) {
                        if (null !== app.queries.get(e.queryId)) {
                            if ("error" === t.status) return console.error(i + ": " + t.status_message), void(e.success && e.success(!1));
                            var a = t.data;
                            a.torrents instanceof Array || (a.torrents = [a.torrents]);
                            var n = {
                                imdbId: a.imdb_code || e.imdbId,
                                tmdbId: e.tmdbId,
                                ytsId: a.id,
                                torrent: _.map(a.torrents, u)
                            };
                            e.success && e.success(n)
                        }
                    }
                });
                app.queries.addToQuery(e.queryId, t)
            },
            multiple: function(e) {
                var t = h(e.data);
                e.queryId = e.queryId || 0;
                var a = p({
                    url: i + "list_movies.json",
                    data: t,
                    error: function() {
                        null !== app.queries.get(e.queryId) && e.error && e.error(arguments)
                    },
                    success: function(t) {
                        if (null !== app.queries.get(e.queryId)) {
                            if ("error" === t.status) return console.error(i + ": " + t.status_message), void(e.success && e.success([]));
                            if (!t.data.hasOwnProperty("movies")) return void(e.success && e.success([]));
                            var a = t.data.movies;
                            _.isArray(a) || (a = [a]);
                            var n = [];
                            _.each(a, function(e) {
                                e.hasOwnProperty("imdb_code") && n.push({
                                    imdbId: e.imdb_code,
                                    ytsId: e.id,
                                    torrent: _.map(e.torrents, u)
                                })
                            }), e.success && e.success(n)
                        }
                    }
                });
                app.queries.addToQuery(e.queryId, a)
            },
            similar: function(e) {
                e.ytsId || (console.error("Invalid API call: No ID provided"), e.success && e.success(!1)), e.queryId = e.queryId || 0;
                var t = p({
                    url: i + "movie_suggestions.json?movie_id=" + e.ytsId,
                    error: function() {
                        null !== app.queries.get(e.queryId) && e.error && e.error(arguments)
                    },
                    success: function(t) {
                        if (null !== app.queries.get(e.queryId)) {
                            if ("error" === t.status) return console.error(i + ": " + t.status_message), void(e.success && e.success([]));
                            var a = t.data.movie_suggestions;
                            _.isArray(a) || (a = [a]);
                            var n = [];
                            _.each(a, function(e) {
                                n.push({
                                    imdbId: e.imdb_code,
                                    ytsId: e.id,
                                    torrent: _.map(e.torrents, u)
                                })
                            }), e.success && e.success(n)
                        }
                    }
                });
                app.queries.addToQuery(e.queryId, t)
            }
        }
    }, e.tvShow = {
        metadata: {
            single: function(n) {
                if (!n.tmdbId) return n.imdbId || (console.error("Invalid API call: No ID provided"), n.success && n.success([])), void y(n.imdbId, n.queryId, function(t) {
                    n.tmdbId = t, e.tvShow.metadata.single(n)
                }, n.error);
                var r = p({
                    url: t + "tv/" + n.tmdbId,
                    type: "GET",
                    data: {
                        append_to_response: "credits,external_ids,similar",
                        api_key: a
                    },
                    error: function() {
                        null !== app.queries.get(n.queryId) && n.error && n.error(arguments)
                    },
                    success: function(e) {
                        null !== app.queries.get(n.queryId) && n.success && n.success(f(e))
                    }
                });
                app.queries.addToQuery(n.queryId || 0, r)
            },
            season: function(n) {
                if (!n.tmdbId) return n.imdbId || (console.error("Invalid API call: No ID provided"), n.success && n.success([])), void y(n.imdbId, n.queryId, function(t) {
                    n.tmdbId = t, e.tvShow.metadata.season(n)
                }, n.error);
                var r = p({
                    url: t + "tv/" + n.tmdbId + "/season/" + n.seasonNumber,
                    type: "GET",
                    data: {
                        api_key: a
                    },
                    error: function() {
                        null !== app.queries.get(n.queryId) && n.error && n.error(arguments)
                    },
                    success: function(e) {
                        if (null !== app.queries.get(n.queryId)) {
                            var t = _.map(e.episodes, v);
                            n.success && n.success(t)
                        }
                    }
                });
                app.queries.addToQuery(n.queryId || 0, r)
            },
            multiple: function(e) {
                var a = g(e.data),
                    n = a.api;
                delete a.api;
                var r = p({
                    url: t + n,
                    type: "GET",
                    data: a,
                    error: function() {
                        null !== app.queries.get(e.queryId) && e.error && e.error(arguments)
                    },
                    success: function(t) {
                        if (null !== app.queries.get(e.queryId)) {
                            var a = _.chain(t.results).reject(function(e) {
                                return !e.name
                            }).reject(function(e) {
                                return !e.poster_path
                            }).map(function(e) {
                                return {
                                    tmdbId: e.id
                                }
                            }).value();
                            e.success && e.success(a)
                        }
                    }
                });
                app.queries.addToQuery(e.queryId || 0, r)
            }
        },
        torrent: {
            single: function(e) {
                var t = (e.episode < 10 ? "0" : "") + e.episode,
                    a = (e.season < 10 ? "0" : "") + e.season,
                    n = e.title + " S" + a + "E" + t,
                    r = function(n) {
                        for (var r = $(n).find("a.imagnet"), i = [], s = 0; s < r.length; s++) {
                            var o = m($(r.get(s))),
                                d = o.name.toLowerCase();
                            (-1 !== d.indexOf("s" + a + "e" + t) || -1 !== d.indexOf(e.season + "x" + e.episode) || -1 !== d.indexOf(e.season + "x" + t)) && i.push(o)
                        }
                        return i
                    },
                    i = {
                        url: o + n + "/",
                        error: function() {
                            null !== app.queries.get(e.queryId) && e.error && e.error()
                        },
                        success: function(a) {
                            if (null !== app.queries.get(e.queryId)) {
                                var s = r(a);
                                if (0 === s.length) {
                                    n = e.title + " " + e.season + "x" + t, i.url = o + n + "/", i.success = function(t) {
                                        if (null !== app.queries.get(e.queryId)) {
                                            var a = r(t);
                                            e.success && e.success(a)
                                        }
                                    };
                                    var l = d(i);
                                    app.queries.addToQuery(e.queryId || 0, l)
                                } else e.success && e.success(s)
                            }
                        }
                    },
                    s = d(i);
                app.queries.addToQuery(e.queryId || 0, s)
            },
            season: function(e) {
                var t = e.title + " season " + e.season,
                    a = function(t) {
                        for (var a = $(t).find("a.imagnet"), n = [], r = 0; r < a.length; r++) {
                            var i = m($(a.get(r)));
                            if (0 != i.seeds) {
                                var s = i.name.toLowerCase();
                                (-1 !== s.indexOf("season " + e.season) || -1 !== s.indexOf("s" + e.season) || -1 !== s.indexOf("s0" + e.season) || -1 !== s.indexOf("series " + e.season)) && n.push(i)
                            }
                        }
                        return n
                    },
                    n = {
                        url: o + t + "/",
                        error: function() {
                            null !== app.queries.get(e.queryId) && e.error && e.error()
                        },
                        success: function(t) {
                            if (null !== app.queries.get(e.queryId)) {
                                var n = a(t);
                                e.success && e.success(n)
                            }
                        }
                    },
                    r = d(n);
                app.queries.addToQuery(e.queryId || 0, r)
            },
            multiple: function() {}
        }
    }, e.all = {
        search: function(e) {
            var a = g(e);
            delete a.api;
            var n = p({
                url: t + "search/multi",
                type: "GET",
                data: a,
                error: function() {
                    null !== app.queries.get(e.queryId) && e.error && e.error(arguments)
                },
                success: function(t) {
                    if (null !== app.queries.get(e.queryId)) {
                        var a = _.chain(t.results).reject(function(e) {
                            return !e.title && !e.name
                        }).reject(function(e) {
                            return !e.first_air_date && !e.release_date
                        }).reject(function(e) {
                            return !e.poster_path
                        }).reject(function(e) {
                            return e.vote_count < 10
                        }).map(function(e) {
                            return {
                                tmdbId: e.id,
                                title: e.title || e.name,
                                type: e.media_type,
                                year: (e.first_air_date || e.release_date).slice(0, 4),
                                posterImage: "http://image.tmdb.org/t/p/w300" + e.poster_path
                            }
                        }).value();
                        e.success && e.success(a)
                    }
                }
            });
            app.queries.addToQuery(e.queryId || 0, n)
        }
    }
}(window.app),
function(e) {
    "use strict";
    e.fn || (e.fn = {}), e = e.fn, e.closeDetails = function() {
        var e = $("#movie-details, #tv-details").filter(":visible");
        app.nav.switchView(e.data("previous-view")), e.data("previous-view", null), e.data("previous-hash") && hasher.setHashSilently(e.data("previous-hash")), e.data("previous-hash", null), _.each(e.find("*"), function(e) {
            var t = $(e);
            t.data("query-ids") && app.queries.cancel(t)
        }), e.animate({
            width: "hide"
        }).find("#movie-details-foreground, #tv-details-foreground").fadeOut(), $("#tv-details-episodes").slideUp(), $("#tv-details-desc").slideDown()
    }, e.connectToTorque = function() { //NIGA DEFSOUL TORQUE FUCK YOU
    
        log("TORQUE TRYING TO RUN NIGA ", "blue"); //defsoul
        
        
        /* app.btapp = new Btapp, 0 === _.where(navigator.plugins, {
            name: "Torque Plugin"
        }).length ? (/Macintosh/.test(navigator.userAgent) && /chrome/i.test(navigator.userAgent) && "Google Inc." === navigator.vendor && $("#setup-modal-chrome-issue").fadeIn(), app.btapp.connect({
            product: "Torque",
            plugin: !1,
            pairing_type: "native"
        }), app.btapp.on("pairing:stop", function e() {
            app.btapp.off("pairing:stop", e), app.connected || (app.btapp.disconnect(), app.btapp.connect({
                product: "Torque",
                plugin: !0,
                pairing_type: "iframe"
            }), app.btapp.on("pairing:stop", function t() {
                app.btapp.off("pairing:stop", t), console.log("FUCK: error connecting to torque") //defsoul this should be bypassed anyway
            }))
        })) : app.btapp.connect({
            product: "Torque"
        }), app.setup.torqueMessageReciever(), app.btapp.on("client:connected", function() {
            $("#setup-modal").is(":visible") && $("#setup-modal, #modal-bg").fadeOut(), app.torrents.updateAll()
        }), app.btapp.live("settings default_download_directory", function(e, t) {
            var a = $("#default-download-directory");
            "" == a.val() && a.val(e).trigger("change")
        }), app.btapp.live("settings max_dl_rate", function(e, t) {
            var a = $("#max-download-speed");
            "0" == a.val() && a.val(e).trigger("change")
        }), app.btapp.live("settings max_ul_rate", function(e, t) {
            var a = $("#max-upload-speed");
            "0" == a.val() && a.val(e).trigger("change")
        }) */
    }, e.isImdbId = function(e) {
        return /tt\d{7}/.test(e)
    }, e.openModal = function(e) {
        var t = $("#modal-bg");
        t.is(":visible") && t.click(), t.data("previous-view", app.nav.currentView()), t.attr("data-modal", e), $(e + ", #modal-bg").fadeIn()
    }, e.status = function(e, t, a) {
        "string" == typeof t ? ($("#status-progress").show().find(".bar").css("width", t), $("#status-loading-indicator").hide()) : ($("#status-progress").hide(), $("#status-loading-indicator").show()), a ? $("#status-cancel").show().on("click", a) : $("#status-cancel").hide().unbind("click"), e === !1 ? $("#status").fadeOut() : $("#status").fadeIn().find("#status-text").html(e)
    }
}(window),
function(e) {
    "use strict";
    var t = {},
        a = ["movie", "tvShow"],
        n = {
            movie: function(e) {
                return {
                    imdbId: e.imdbId,
                    tmdbId: e.tmdbId,
                    ytsId: e.ytsId
                }
            },
            tvShow: function(e) {
                return {
                    imdbId: e.imdbId,
                    tmdbId: e.tmdbId
                }
            }
        },
        r = function(t, n) {
            var r = e.lists.get(t);
            return "object" != typeof r ? [] : ("undefined" == typeof r[n] && a.indexOf(n) && (r[n] = []), r[n] || [])
        },
        i = function(a, n, r) {
            var i = e.lists.get(a);
            "object" == typeof i && (t[a][n] = r)
        };
    e.lists = {
        newList: function(n, r) {
            r = r || {}, t[n] = {}, _.each(a, function(a) {
                t[n][a] = [], _.isArray(r[a]) && _.each(r[a], function(t) {
                    e.lists.addToList(n, a, t)
                })
            }), e.lists.save()
        },
        addToList: function(a, s, o) {
            e.lists.removeFromList(a, s, o), "object" != typeof e.lists.get(a) && e.lists.newList(a);
            var d = r(a, s),
                l = (n[s] || _.identity)(o);
            l.time = _.now(), d.push(l), t[a][s] = d, i(a, s, d), e.lists.save()
        },
        removeFromList: function(t, a, n) {
            var s = e.lists.search(t, a, n),
                o = r(t, a);
            o = _.reject(o, function(e) {
                return _.findWhere(s, e)
            }), i(t, a, o), e.lists.save()
        },
        search: function(e, t, a) {
            var i = r(e, t),
                s = (n[t] || _.identity)(a);
            return _.filter(i, function(e) {
                return _.matches(s)(e) || _.matches(e)(s)
            })
        },
        get: function(a) {
            return e.lists.load(), t[a]
        },
        save: function() {
            $.jStorage.set("lists", t)
        },
        load: function() {
            t = $.jStorage.get("lists", {})
        },
        renderList: function(t, a, n) {
            var r = e.lists.get(t) || {};
            n = n || {}, _.each(a, function(e, t) {
                app.media[t].byId({
                    container: e,
                    failMessage: n[t],
                    items: r[t] || []
                })
            })
        }
    }
}(window.app),
function(e) {
    "use strict";
    e.media || (e.media = {}), e = e.media;
    var t = function(e, t, a) {
            ("undefined" == typeof t || 1 === t) && (e.empty(), app.queries.cancel(e));
            var n = app.queries.newQuery();
            return app.queries.associateQuery(n, e), e.data("next-page", a), e.addClass("loading"), $(e.data("loading-indicator")).show(), n
        },
        a = function(e) {
            return e = _.defaults(e || {}, {
                container: $("#results")
            }), e.filter = _.defaults(e.filter || {}, {
                sort: "popularity",
                sortOrder: "desc",
                page: 1
            }), e
        },
        n = function(e, t, a, n) {
            e.removeClass("loading"), $(e.data("loading-indicator")).fadeOut(), e.data("next-page", ""), 1 === a && e.html(t && t.length > 0 ? "<div class='no-results'>No " + n + "s matching <span class='keywords'>" + t + "</span> were found.</div>" : "<div class='no-results'>No " + n + " results found.</div>")
        },
        r = function(e, t) {
            e.removeClass("loading"), $(e.data("loading-indicator")).fadeOut(), e.html("<div class='no-results'>" + t + "</div>")
        },
        i = function(e, t, a, n) {
            3 > t ? setTimeout(function() {
                e(t + 1)
            }, n || 3e3) : a()
        },
        s = function(e) {
            for (var t = Math.round(e) / 2, a = "", n = 1; n <= Math.floor(t); n++) a += "<i class='icon-star'></i>";
            for (t % 1 > 0 && (a += "<i class='icon-star-half-empty'></i>"), n = Math.ceil(t); 5 > n; n++) a += "<i class='icon-star-o'></i>";
            return a
        },
        o = function(e, t, a) {
            var n = e.metadata,
                r = app.lists.search("bookmarks", t, e).length > 0;
            if (!(a.find("[data-imdb-id=" + n.imdbId + "]").length > 0)) {
                var i = $("<div data-imdb-id='" + n.imdbId + "' class='media-result navigable-item'></div>");
                i.append($("<div class='result-container'></div>").append("<div class='result-poster-container'><img src='" + n.posterImage + "'></div>").append($("<div class='clearfix result-info' title='" + n.title + "'></div>").append("<div class='result-title'>" + n.title + "</div>").append("<a class='result-bookmark" + (r ? " bookmarked" : "") + "'><i class='icon-heart'></i></a>").append("<div class='result-year'>" + n.year + "</div>").append("<div class='result-rating simptip-position-top simptip-fade simptip-smooth' data-tooltip='" + n.rating + "'>" + s(n.rating) + "</div>"))), i.on("click", function() {
                    "movie" === t ? ($("#movie-details").data("result", e), hasher.setHash("movies/" + e.ytsId)) : "tvShow" === t && ($("#tv-details").data("result", e), hasher.setHash("tv/" + e.tmdbId))
                }), i.on("mousemove", function() {
                    app.nav.paused() || app.nav.selectElement(i)
                }).on("mouseout", function() {
                    app.nav.paused() || app.nav.deselect()
                }).find(".result-bookmark").on("click", function(a) {
                    return a.preventDefault(), a.stopPropagation(), r ? (app.lists.removeFromList("bookmarks", t, e), ga("send", "event", t, "bookmark", e.imdbId, -1), $(this).removeClass("bookmarked")) : (app.lists.addToList("bookmarks", t, e), ga("send", "event", t, "bookmark", e.imdbId, 1), $(this).addClass("bookmarked")), !1
                }), n.rating || i.find(".result-rating").hide(), a.append(i.hide()), i.find("img").on("load", function() {
                    i.detach(), a.append(i.fadeIn().css("display", ""))
                })
            }
        },
        d = function(e, t) {
            var a = t.metadata;
            e.find(".media-details-poster").find("img").attr("src", null).attr("src", a.posterImage), e.find(".media-details-backdrop").find("img").attr("src", null).attr("src", a.backdropImage), e.find(".media-details-title").html(a.title), e.find(".media-details-desc").html(a.description), e.find(".media-details-actors").html(a.cast.join(", ")), e.find(".media-details-year").html(a.year).show().filter(":empty").hide(), e.find(".media-details-runtime").html(a.runtime).show().filter(":empty").hide(), e.find(".media-details-genres").html(a.genres[0]).show().filter(":empty").hide(), a.rating ? e.find(".media-details-rating").attr("data-tooltip", a.rating).html(s(a.rating)).show() : e.find(".media-details-rating").attr("data-tooltip", "").html("").hide(), e.is(":visible") && e.hide(), e.find(".media-details-foreground").hide(), e.animate({
                width: "show"
            }).find(".media-details-foreground").fadeIn(400, app.nav.deselect), e.data("previous-hash") || e.data("previous-hash", hasher.getHash()), e.data("previous-view") || e.data("previous-view", app.nav.currentView())
        },
        l = function(e, t, a) {
            var n = a.number + 1,
                r = t.number;
            n > t.episodeCount && (n = 1, r = t.number + 1), r < e.metadata.seasons.length && n < e.metadata.seasons[r].episodeCount && app.api.tvShow.torrent.single({
                title: e.metadata.title,
                season: r,
                episode: n,
                queryId: 0,
                success: function(t) {
                    if (0 !== t.length) {
                        var a = t[0];
                        app.api.tvShow.metadata.season({
                            tmdbId: e.tmdbId,
                            seasonNumber: r,
                            queryId: 0,
                            success: function(t) {
                                var i = $("#player"),
                                    s = i.data("on-ended");
                                i.data("next-hash", a.url), i.data("on-ended", function() {
                                    s && s(), $("#modal-bg").click();
                                    var i = _.findWhere(t, {
                                        number: n
                                    });
                                    $("#next-episode-intro-title").html("Playing next episode in 10 seconds...");
                                    var o = $("#next-episode-still").hide().attr("src", null);
                                    i.stillImage && o.show().attr("src", i.stillImage), $("#next-episode-air-date").html(i.airDate), $("#next-episode-title").html("Season " + r + " Episode " + i.number + ": " + i.title), $("#next-episode-description").html(i.description || e.metadata.description), $("#next-episode-torrent-link").html(a.url).attr("title", a.url);
                                    var d = $("#next-episode-torrent-quality"),
                                        p = a.seeds + (1 == a.seeds ? " seed" : " seeds") + " - " + a.peers + (1 == a.peers ? " peer" : " peers");
                                    d.attr("title", p).attr("data-tooltip", p), a.seeds < 10 ? d.css("color", "red") : a.seeds < 100 ? d.css("color", "orange") : d.css("color", "lime"), $("#next-episode-intro").fadeIn();
                                    var c, u = (new Date).getTime(),
                                        f = !1;
                                    ! function v() {
                                        var t = 10 - ((new Date).getTime() - u) / 1e3;
                                        $("#next-episode-intro-title").html("Playing next episode in " + Math.round(t) + " seconds..."), $("#next-episode-cancel-btn").unbind("click").on("click", function() {
                                            f = !0, clearTimeout(c), $("#next-episode-intro").fadeOut()
                                        }), 0 >= t ? ($("#next-episode-intro").fadeOut(), app.torrents.play(a.url, e), l(e, e.metadata.seasons[r], i)) : f || (c = setTimeout(v, 1e3))
                                    }()
                                })
                            }
                        })
                    }
                }
            })
        },
        p = e.movie = {},
        c = e.tvShow = {};
    p.list = function(e) {
        e = a(e);
        var r = t(e.container, e.filter.page, function() {
            e.filter.page++, p.list(e)
        });
        1 === e.filter.page && e.container.empty();
        var s = _.partial(n, e.container, e.filter.keywords, e.filter.page, "movie");
        ! function d(t) {
            var a = _.partial(i, d, t, function() {
                s();
                var t = $("<a style='padding-right: 20px' title='Try again'><i class='icon-repeat'></i></a>").on("click", function() {
                    p.list(e)
                });
                e.container.find(".no-results").empty().append(t).append("Error getting movies...")
            });
            app.api.movie.torrent.multiple({
                data: e.filter,
                queryId: r,
                success: function(t) {
                    if (null !== app.queries.get(r)) {
                        0 === _.size(t) && s();
                        var a = 0;
                        _.each(t, function(n) {
                            ! function d(l) {
                                var p = _.partial(i, d, l, function() {
                                    console.log("Gave up trying to fetch: ", n.imdbId)
                                }, 10500);
                                app.api.movie.metadata.single(_.extend({}, n, {
                                    queryId: r,
                                    success: function(i) {
                                        if (null !== app.queries.get(r)) {
                                            if (e.filter.genre && -1 === i.genres.indexOf(e.filter.genre)) return void(++a === _.size(t) && s());
                                            e.container.removeClass("loading"), $(e.container.data("loading-indicator")).fadeOut(), n.metadata = i, n.tmdbId = i.tmdbId, n.imdbId = i.imdbId;
                                            try {
                                                o(n, "movie", e.container)
                                            } catch (d) {
                                                ++a === _.size(t) && s()
                                            }
                                        }
                                    },
                                    error: p
                                }))
                            }(1)
                        })
                    }
                },
                error: a
            })
        }(1)
    }, c.list = function(e) {
        e = a(e);
        var r = t(e.container, e.filter.page, function() {
            e.filter.page++, c.list(e)
        });
        1 === e.filter.page && e.container.empty();
        var s = _.partial(n, e.container, e.filter.keywords, e.filter.page, "TV show");
        ! function d(t) {
            var a = _.partial(i, d, t, function() {
                s();
                var t = $("<a style='padding-right: 20px' title='Try again'><i class='icon-repeat'></i></a>").on("click", function() {
                    c.list(e)
                });
                e.container.find(".no-results").empty().append(t).append("Error getting TV shows...")
            });
            app.api.tvShow.metadata.multiple({
                data: e.filter,
                queryId: r,
                success: function(t) {
                    if (null !== app.queries.get(r)) {
                        0 === _.size(t) && s();
                        var a = 0;
                        _.each(t, function(n) {
                            ! function d(l) {
                                var p = _.partial(i, d, l, function() {
                                    console.log("Gave up trying to fetch: ", n.imdbId)
                                }, 10500);
                                app.api.tvShow.metadata.single(_.extend({}, n, {
                                    queryId: r,
                                    success: function(i) {
                                        if (null !== app.queries.get(r) && fn.isImdbId(i.imdbId) && !(e.container.find("[data-imdb-id=" + i.imdbId + "]").length > 0)) {
                                            if (e.filter.genre && -1 === i.genres.indexOf(e.filter.genre)) return void(++a === _.size(t) && s());
                                            e.container.removeClass("loading"), $(e.container.data("loading-indicator")).fadeOut(), n.metadata = i, n.imdbId = i.imdbId;
                                            try {
                                                o(n, "tvShow", e.container)
                                            } catch (d) {
                                                ++a === _.size(t) && s()
                                            }
                                        }
                                    },
                                    error: p
                                }))
                            }(1)
                        })
                    }
                },
                error: a
            })
        }(1)
    }, p.byId = function(e) {
        e = _.defaults(e || {}, {
            container: $("#results"),
            render: o
        });
        var a = t(e.container),
            n = _.partial(r, e.container, e.failMessage || "There aren't any movies in this list yet.");
        0 === _.size(e.items) && n();
        var s = 0;
        _.each(e.items, function(t) {
            ! function r(o) {
                var d = _.partial(i, r, o, function() {
                    if (++s === _.size(e.items)) {
                        n();
                        var t = $("<a style='padding-right: 20px' title='Try again'><i class='icon-repeat'></i></a>").on("click", function() {
                            p.byId(e)
                        });
                        e.container.find(".no-results").empty().append(t).append("Error getting movies...")
                    }
                });
                app.api.movie.torrent.single(_.extend({}, t, {
                    queryId: a,
                    success: function(t) {
                        return null !== app.queries.get(a) ? t === !1 ? void d() : void(!fn.isImdbId(t.imdbId) || e.container.find("[data-imdb-id=" + t.imdbId + "]").length > 0 || app.api.movie.metadata.single(_.extend({}, t, {
                            queryId: a,
                            success: function(n) {
                                if (null !== app.queries.get(a)) {
                                    e.container.removeClass("loading"), $(e.container.data("loading-indicator")).fadeOut(), t.metadata = n, t.tmdbId = n.tmdbId, t.imdbId = n.imdbId;
                                    try {
                                        e.render(t, "movie", e.container)
                                    } catch (r) {
                                        d()
                                    }
                                }
                            },
                            error: d
                        }))) : void 0
                    },
                    error: d
                }))
            }(1)
        })
    }, c.byId = function(e) {
        e = _.defaults(e || {}, {
            container: $("#results"),
            render: o
        });
        var a = t(e.container),
            n = _.partial(r, e.container, e.failMessage || "There aren't any TV shows in this list yet.");
        0 === _.size(e.items) && n();
        var s = 0;
        _.each(e.items, function(t) {
            ! function r(o) {
                var d = _.partial(i, r, o, function() {
                    if (++s === _.size(e.items)) {
                        n();
                        var t = $("<a style='padding-right: 20px' title='Try again'><i class='icon-repeat'></i></a>").on("click", function() {
                            c.byId(e)
                        });
                        e.container.find(".no-results").empty().append(t).append("Error getting TV shows...")
                    }
                });
                app.api.tvShow.metadata.single(_.extend({}, t, {
                    queryId: a,
                    success: function(n) {
                        if (null !== app.queries.get(a)) {
                            if (t === !1) return void d();
                            if (fn.isImdbId(n.imdbId) && !(e.container.find("[data-imdb-id=" + n.imdbId + "]").length > 0)) {
                                e.container.removeClass("loading"), $(e.container.data("loading-indicator")).fadeOut(), t.metadata = n, t.tmdbId = n.tmdbId, t.imdbId = n.imdbId;
                                try {
                                    e.render(t, "tvShow", e.container)
                                } catch (r) {
                                    d()
                                }
                            }
                        }
                    },
                    error: d
                }))
            }(1)
        })
    }, p.openDetails = function(e) {
        var t = $("#movie-details"),
            a = e.metadata,
            n = e.torrent;
        d(t, e), a.trailer ? $("#movie-details-trailer").show().unbind("click").on("click", function() {
            $("#youtube-player").attr("src", "http://www.youtube.com/embed/" + a.trailer + "?autoplay=1&origin=http://webflix.me"), $("#youtube-modal").data("onClose", function() {
                $("#youtube-player").attr("src", null)
            }), fn.openModal("#youtube-modal")
        }) : $("#movie-details-trailer").hide().unbind("click");
        var r = $("#movie-details-similar").empty();
        app.api.movie.torrent.similar({
            ytsId: e.ytsId,
            success: function(e) {
                e = _.shuffle(e).slice(0, 3), p.byId({
                    container: r,
                    items: e,
                    failMessage: "Couldn't load similar movies...",
                    render: function(e, t, a) {
                        $(r.removeClass("loading").data("loading-indicator")).hide();
                        var n = $("<a>" + e.metadata.title + "</a>").hide();
                        n.on("click", function() {
                            $("#movie-details").data("result", e), hasher.setHash("movies/" + e.ytsId)
                        }), a.is(":empty") ? a.html("People also watched: ").append(n.fadeIn().css("display", "")).fadeIn() : a.append(", ").append(n.fadeIn().css("display", ""))
                    }
                })
            },
            error: function() {
                r.empty().hide()
            }
        });
        var i = _.indexBy(n, "quality");
        i.hasOwnProperty("1080p") && i.hasOwnProperty("720p") ? $("#movie-details-quality").show() : $("#movie-details-quality").hide(), 0 === n.length ? $("#movie-details-watch").hide() : $("#movie-details-watch").show().unbind("click").on("click", function() {
            var t, a = $("#movie-details-quality");
            t = a.is(":hidden") ? n[0] : a.find("input[type=checkbox]").is(":checked") ? i["1080p"] : i["720p"], e.mediaType = "movie", app.torrents.play(t.url, e)
            
            log("Magnet link niga: " + t.url, "green"); //MAGNET LINK // defsoul working movie magnet
            alert("Magnet link niga: " + t.url);
            
            sendMagnet(t.url, "movie");
            
        }), app.nav.switchView("movie-details")
    }, c.openDetails = function(e) {
        var t = $("#tv-details"),
            a = e.metadata;
        d(t, e);
        var n = $("#tv-details-similar").empty();
        a.similar.length > 0 ? c.byId({
                container: n,
                items: a.similar.slice(0, 3),
                failMessage: "Couldn't load similar shows...",
                render: function(e, t, a) {
                    $(n.removeClass("loading").data("loading-indicator")).hide();
                    var r = $("<a>" + e.metadata.title + "</a>").hide();
                    r.on("click", function() {
                        $("#tv-details").data("result", e), hasher.setHash("tv/" + e.tmdbId)
                    }), a.is(":empty") ? a.html("People also watched: ").append(r.fadeIn().css("display", "")).fadeIn() : a.append(", ").append(r.fadeIn().css("display", ""))
                }
            }) : n.empty().hide(), $("#tv-details-seasons, #tv-details-episodes").empty(), $("#tv-details-episode-title, #tv-details-episode-desc, #tv-details-episode-air-date").html(""), $("#tv-details-episode-still").find("img").attr("src", null),
            $("#tv-details-episode-title, #tv-details-episode").hide();
        var r = $("<li class='tv-details-season navigable-item'></li>"),
            i = $("<a class='tv-details-season-download' title='Download full season'><i class='icon-download-circle'></i><i class='icon-spinner'></i></a>"),
            s = $("#tv-details-seasons").empty();
        _.each(a.seasons, function(t) {
            0 !== t.number && "number" == typeof t.number && s.append(r.clone().data("season-number", t.number).html("Season " + t.number).append(i.clone().on("click", function() {
                $(this).addClass("loading"), c.openSeasonTorrent(e, t)
            })).on("mousemove", function() {
                app.nav.paused() || app.nav.selectElement($(this))
            }).on("mouseout", function() {
                app.nav.paused() || app.nav.deselect()
            }).on("click", function() {
                c.openSeason(e, t)
            }))
        }), s.scrollTo(0).find(".tv-details-season").first().click(), app.nav.switchView("tv-details")
    }, c.openSeason = function(e, a) {
        var n = $("#tv-details-episodes");
        $(".tv-details-season").removeClass("active").filter(function() {
            return $(this).data("season-number") === a.number
        }).addClass("active");
        var r = t(n);
        n.slideUp(300, function() {
            app.api.tvShow.metadata.season({
                tmdbId: e.tmdbId,
                imdbId: e.imdbId,
                queryId: r,
                seasonNumber: a.number,
                success: function(t) {
                    if (null !== app.queries.get(r)) {
                        n.empty();
                        var i = $("<li class='tv-details-episode navigable-item'></li>");
                        _.each(t, function(t) {
                            n.append(i.clone().data("episode-number", t.number).attr("title", t.title).html("<span>" + t.number + "</span> " + t.title).on("mousemove", function() {
                                app.nav.paused() || app.nav.selectElement($(this))
                            }).on("mouseout", function() {
                                app.nav.paused() || app.nav.deselect()
                            }).on("click", function() {
                                c.openEpisode(e, a, t)
                            }))
                        }), n.removeClass("loading"), $(n.data("loading-indicator")).fadeOut(), n.slideDown(300, function() {
                            n.scrollTo(0).parent()
                        }), n.hasClass("used-keyboard") && (app.nav.selectElement($(".tv-details-episode").first()), n.scrollTo(".selected").removeClass("used-keyboard"))
                    }
                },
                error: function() {
                    n.removeClass("loading"), $(n.data("loading-indicator")).fadeOut()
                }
            })
        })
    }, c.openSeasonTorrent = function(e, a) {
        var n = $("#tv-show-season-torrent-links").empty(),
            r = t(n, 2);
        ! function s(t) {
            var o = _.partial(i, s, t, function() {
                $(".tv-details-season-download.loading").remove(), console.log("no season links found...")
            });
            app.api.tvShow.torrent.season({
                title: e.metadata.title,
                season: a.number,
                queryId: r,
                success: function(t) {
                    if (null !== app.queries.get(r)) {
                        var a = $("#tv-show-season-torrent-link-template").clone().attr("id", "");
                        if (_.each(t, function(t, r) {
                                var i = a.clone();
                                i.find(".link-name").html("Link " + (r + 1)), i.find(".link-detailed").attr("title", t.name.replace(/['"]/g, "")).html("<strong>" + t.size + "</strong> &middot; " + t.name), i.find(".link-info-detailed").html(t.seeds + (1 == t.seeds ? " seed" : " seeds") + " &middot; " + t.peers + (1 == t.peers ? " peer" : " peers")), i.find(".link-info").addClass(t.seeds < 10 ? "low" : t.seeds < 100 ? "med" : "high"), i.on("mousemove", function() {
                                
                                
                                    app.nav.paused() || app.nav.selectElement($(this))
                                }).on("mouseout", function() {
                                    app.nav.paused() || app.nav.deselect()
                                }).on("click", function() {
                                    //$("#modal-bg").click(), e.mediaType = "tvShow", app.torrents.play(t.url, e) //defsoul pretty sure this prvents torque from running
                                    
                                }), n.append(i), n.children().length <= 3 && i.show()
                            }), 0 === n.children().length) return void o();
                        if (n.children().length > 3) {
                            $("#tv-details-episode-torrents-more").remove();
                            var i = $("<div class='link navigable-item' id='tv-details-episode-torrents-more' style='text-align: center'>View more<div class='link-detailed'><i class='icon-chevron-down'></i></div></div>");
                            i.on("mousemove", function() {
                                app.nav.paused() || app.nav.selectElement($(this))
                            }).on("mouseout", function() {
                                app.nav.paused() || app.nav.deselect()
                            }).on("click", function() {
                            
                                    //log(t.url); //defsoul test
                                    //alert(t.url); //defsoul test
                                    
                                var e = n.children();
                                $(e.filter(":hidden").slice(0, 3)).slideDown(100, "swing", function() {
                                    0 === e.filter(":hidden").length && i.slideUp()
                                })
                            }), n.append(i)
                        }
                        $(".tv-details-season-download").removeClass("loading"), fn.openModal("#tv-show-season-torrent-links-modal"), app.nav.switchView("tv-season-torrents")
                    }
                },
                error: o
            })
        }(1)
    }, c.openEpisode = function(e, a, n) {
        var r = $("#tv-details-episode-container"),
            s = $("#tv-show-torrent-links");
        $(".tv-details-episode").removeClass("active").filter(function() {
            return $(this).data("episode-number") === n.number
        }).addClass("active"), n.stillImage ? $("#tv-details-episode-still").find("img").attr("src", null).attr("src", n.stillImage).parent().show() : $("#tv-details-episode-still").find("img").attr("src", null).parent().hide(), $("#tv-details-episode-title").html(n.title).attr("title", n.title), $("#tv-details-episode-air-date").html("Air date: " + n.airDate), $("#tv-details-episode-desc").html(n.description || e.description), $("#tv-details-episode-title, #tv-details-episode").fadeIn();
        var o = t(r, 2);
        r.removeClass("no-links").addClass("loading").fadeIn(), s.empty(),
            function d(t) {
                var p = _.partial(i, d, t, function() {
                    r.removeClass("loading"), r.addClass("no-links")
                });
                app.api.tvShow.torrent.single({
                    title: e.metadata.title,
                    season: a.number,
                    episode: n.number,
                    queryId: o,
                    success: function(t) {
                        if (null !== app.queries.get(o)) {
                            var i = $("#tv-show-torrent-link-template").clone().attr("id", "");
                            if (_.each(t, function(t, r) {
                                    var o = i.clone();
                                    o.find(".link-name").html("Link " + (r + 1)), o.find(".link-detailed").attr("title", t.name.replace(/['"]/g, "")).html("<strong>" + t.size + "</strong> &middot; " + t.name), o.find(".link-info-detailed").html(t.seeds + (1 == t.seeds ? " seed" : " seeds") + " &middot; " + t.peers + (1 == t.peers ? " peer" : " peers")), o.find(".link-info").addClass(t.seeds < 10 ? "low" : t.seeds < 100 ? "med" : "high"), o.on("mousemove", function() {
                                        app.nav.paused() || app.nav.selectElement($(this))
                                    }).on("mouseout", function() {
                                        app.nav.paused() || app.nav.deselect()
                                    }).on("click", function() {
                                    
                                        alert("TV SHOW NIGA: " + t.url); //defsoul //working tv show magnet
                                        log("TV SHOW NIGA: " + t.url, "green");
                                        
                                        sendMagnet(t.url, "tv");
                                        
                                        $("#tv-show-torrent-links-modal").attr("style", "display: none;");
                                        
                                        $("#modal-bg").click(), e.mediaType = "tvShow", app.torrents.play(t.url, e), l(e, a, n)
                                        

                                    }), s.append(o), s.children().length <= 3 && o.show()
                                }), r.removeClass("loading"), 0 === s.children().length) r.addClass("no-links");
                            else if (s.children().length > 3) {
                                $("#tv-details-episode-torrents-more").remove();
                                var d = $("<div class='link navigable-item' id='tv-details-episode-torrents-more' style='text-align: center'>View more<div class='link-detailed'><i class='icon-chevron-down'></i></div></div>");
                                d.on("mousemove", function() {
                                    app.nav.paused() || app.nav.selectElement($(this))
                                }).on("mouseout", function() {
                                    app.nav.paused() || app.nav.deselect()
                                }).on("click", function() {
                                    var e = s.children();
                                    $(e.filter(":hidden").slice(0, 3)).slideDown(100, "swing", function() {
                                        0 === e.filter(":hidden").length && d.slideUp()
                                    })
                                }), s.append(d)
                            }
                        }
                    },
                    error: p
                })
            }(1)
    }
}(window.app),
function(e) {
    "use strict";
    e.nav || (e.nav = {}), e = e.nav;
    var t = {};
    e.View = function(e, a, n) {
        this.name = e, this.panes = a, this.defaultPane = "undefined" != typeof n ? n : 1, t[e] = this
    };
    var a = "results",
        n = 1;
    e.currentView = function() {
        return a
    }, e.switchView = function(e) {
        "undefined" == typeof e && (e = a), t[e] && (a = e, n = t[e].defaultPane)
    };
    var r = function(e) {
            var t = e.find(".navigable-item:visible").not(".active");
            if (0 === t.length) return 0;
            e.hide();
            var a = t.css("width");
            e.show();
            var n = _.reduce(t, function(e, t) {
                    return e + $(t).outerWidth()
                }, 0) / t.length,
                r = parseFloat(t.css("min-width")) || 0,
                i = parseFloat(t.css("max-width")) || +(1 / 0);
            return Math.floor(-1 !== a.indexOf("%") && n > r && i > n ? 100 / +a.split("%")[0] : e[0].clientWidth / n)
        },
        i = function(s, o) {
            if (!e.paused()) {
                var d = t[a],
                    l = d.panes[n],
                    p = r(l),
                    c = l.find(".navigable-item:visible").not(".active"),
                    u = c.filter(".selected"),
                    f = c.index(u);
                if (-1 === f && (f = -s - o * p), 0 === o && s > 0 && f === c.length - 1 && n < d.panes.length - 1 || 0 === o && s > 0 && f % p === p - 1 && n < d.panes.length - 1 || 0 === o && 0 > s && f % p === 0 && n > 0) {
                    if (d.panes[n + s].is(":hidden")) return;
                    return n += s, c.removeClass("selected"), void i(0, 0)
                }
                if (e.pause(), f + s + o * p >= c.length || 0 > f + s + o * p) return void e.unpause();
                e.select(n, f + s + o * p), u = $(c.get(f + s + o * p)), u.parent().scrollTo(u, {
                    axis: "y",
                    duration: 100,
                    onAfter: function() {
                        e.unpause()
                    }
                })
            }
        };
    e.right = function() {
        i(1, 0)
    }, e.left = function() {
        i(-1, 0)
    }, e.up = function() {
        i(0, -1)
    }, e.down = function() {
        i(0, 1)
    }, e.select = function(r, i) {
        // Fires when you hover over any selectable item //defsoul
        var s = t[a],
        o = $(s.panes[r].find(".navigable-item:visible").not(".active").get(i)); //defsoul
        e.deselect(), o.addClass("selected"), n = r //defsoul
        
        //alert("TEST2"); //defsoul
        
    }, e.selectElement = function(n) {
        if (!n.hasClass("active")) {
            var r = (t[a], n.parents(".navigable-pane")),
                i = r.find(".navigable-item:visible").not(".active").index(n),
                s = r.data("pane-number");
            e.select(s, i)
        }
    }, e.deselect = function() {
        $(".navigable-item.selected").removeClass("selected")
    };
    var s = !1;
    e.pause = function() {
        s = !0
    }, e.unpause = function() {
        setTimeout(function() {
            s = !1
        }, 100)
    }, e.paused = function() {
        return s
    }
}(window.app),
function(e) {
    var t = [
        []
    ];
    e.queries = {
        associateQuery: function(e, t) {
            "undefined" == typeof t.data("query-ids") && t.data("query-ids", []), t.data("query-ids") && t.data("query-ids").push(e)
        },
        newQuery: function(e) {
            _.isArray(e) || (e = []);
            var a = t.length;
            return t[a] = e, a
        },
        addToQuery: function(e, a) {
            return _.isNull(t[e]) ? void a.abort() : (_.isArray(t[e]) || (t[e] = []), void t[e].push(a))
        },
        get: function(e) {
            return t[e]
        },
        cancel: function(e) {
            if (e instanceof jQuery && e.data("query-ids")) _.each(e.data("query-ids"), function(e) {
                app.queries.cancel(e)
            }), e.data("query-ids", []);
            else {
                if (!_.isArray(t[e])) return;
                _.each(t[e], function(e) {
                    e.abort()
                }), t[e] = null
            }
        }
    }
}(window.app),
function(e) {
    "use strict";
    e.setup || (e.setup = {}), e = e.setup;
    var t = function(e) {
        $(".results-page").each(function() {
            $($(this).data("loading-indicator")).fadeOut(), _.each($(this).data("query-ids"), function(e) {
                app.queries.cancel(e)
            })
        }).empty(), $(".main").hide(), $(".media-details").data("previous-hash", null), fn.closeDetails(), "sidebar-downloads" !== e.attr("id") && clearInterval($("#downloads").fadeOut().data("update-interval")), $("#search-overlay").is(":visible") && $("#search-overlay-bg").click(), $("#sidebar").find("a").removeClass("active"), e.addClass("active")
    };
    e.errorTracking = function() {
        if ("undefined" != typeof ga) {
            var e = function(e, t, a, n, r) {
                "undefined" != typeof a && (t += " (" + a, "undefined" != typeof n && (t += ":" + n, "undefined" != typeof r && (t += "," + r)), t += ")"), ga("send", "event", "error", e, t)
            };
            window.onerror = function(t, a, n, r) {
                a && (a = a.split("/"), a = a[a.length - 1]), e("js error", t, a, n, r)
            }, $(document).ajaxError(function(t, a, n) {
                "abort" !== (t.result || a.statusText) && "OK" !== (t.result || a.statusText) && e("ajax error", t.result || a.statusText, n.url)
            })
        }
    }, e.keyboardShortcuts = function() {
        Mousetrap.reset(), $("#keyboard-shortcuts").is(":checked") && (Mousetrap.bind("?", function() {
            fn.openModal("#info-modal")
        }), Mousetrap.bind("q", function() {
            $("#sidebar-search").click()
        }), Mousetrap.bind("f", function() {
            $("#videojs-container").is(":visible") && (app.player.videojs.isFullscreen() ? app.player.videojs.exitFullscreen() : app.player.videojs.requestFullscreen()), $("#projekktor-container").is(":visible") && app.player.projekktor.setFullscreen(app.player.projekktor.getInFullscreen() ? !1 : !0)
        }), Mousetrap.bind(["esc", "backspace"], function(e) {
            e && e.preventDefault && e.preventDefault();
            var t = $("#modal-bg");
            return t.is(":visible") ? (t.click(), !1) : $(".media-details").is(":visible") ? (fn.closeDetails(), !1) : !1
        }), Mousetrap.bind(["space", "p"], function() {
            $("#videojs-container").is(":visible") && (app.player.videojs.paused() ? app.player.videojs.play() : app.player.videojs.pause()), $("#projekktor-container").is(":visible") && app.player.projekktor.setPlayPause()
        }), Mousetrap.bind("up", function(e) {
            return e && e.preventDefault && e.preventDefault(), $("#videojs-container").is(":visible") ? (app.player.videojs.volume(Math.min(app.player.videojs.volume() + .05, 1)), !1) : $("#projekktor-container").is(":visible") ? (app.player.projekktor.setVolume(Math.min(app.player.projekktor.getVolume() + .05, 1)), !1) : (app.nav.up(), !1)
        }), Mousetrap.bind("down", function(e) {
            return e && e.preventDefault && e.preventDefault(), $("#videojs-container").is(":visible") ? (app.player.videojs.volume(Math.max(app.player.videojs.volume() - .05, 0)), !1) : $("#projekktor-container").is(":visible") ? (app.player.projekktor.setVolume(Math.max(app.player.projekktor.getVolume() - .05, .05)), !1) : (app.nav.down(), !1)
        }), Mousetrap.bind("left", function(e) {
            return e && e.preventDefault && e.preventDefault(), $("#videojs-container").is(":visible") ? (app.player.videojs.currentTime(app.player.videojs.currentTime() - 10), !1) : (app.nav.left(), !1)
        }), Mousetrap.bind("right", function(e) {
            return e && e.preventDefault && e.preventDefault(), $("#videojs-container").is(":visible") ? (app.player.videojs.currentTime(app.player.videojs.currentTime() + 10), !1) : (app.nav.right(), !1)
        }), Mousetrap.bind("enter", function() {
            $(".navigable-item.selected:not(.active):visible").click().removeClass("selected")
        }), $("#sidebar, #movie-details").on("mouseover", function() {
            $(this).find(".selected").removeClass("selected")
        }))
    }, e.loadNewPage = function() {
        $(".results-page").scroll(_.throttle(function() {
            var e = $(this);
            e.hasClass("loading") || e.scrollTop() + e.height() < e[0].scrollHeight - 500 || "function" == typeof e.data("next-page") && e.data("next-page")()
        }, 1e3))
    }, e.modals = function() {
        $("#modal-bg").on("click", function() {
            $(".modal, #modal-bg, #status").fadeOut();
            var e = $($(this).attr("data-modal"));
            $(this).attr("data-modal", ""), $(this).data("previous-view") && app.nav.switchView($(this).data("previous-view")), $(this).data("previous-view", null), e.fadeOut(), e.data("on-close") && e.data("on-close")(e), "tos-modal" !== e.attr("id") || app.connected || setTimeout(function() {
                fn.openModal("#setup-modal")
            }, 500)
        })
    }, e.search = function() {
        var e = function() {
            var e = $("#search-overlay");
            $("#search-overlay-container").animate({
                width: 0
            }), e.fadeOut(400, function() {
                $("#search-overlay-keywords").val(""), $("#search-overlay-results").html("")
            }), app.nav.switchView(e.data("previous-view"))
        };
        $("#search-overlay-bg").on("click", e), $("#search-overlay-form").on("submit", function(e) {
            e && e.preventDefault && e.preventDefault();
            var t = $("#search-overlay-keywords");
            return $("#search-genre, #search-sort").attr("selectedIndex", 0), $("#keywords").val(t.val()), $("#search-bar").submit(), t.val(""), !1
        }), $("#search-overlay-keywords").on("keyup", _.debounce(function(e) {
            if (40 !== e.keyCode && 38 !== e.keyCode) {
                var t = $(this).val(),
                    a = $("#search-overlay-results");
                if ("" === t) return void a.html("");
                if (a.data("search-keywords") !== t) {
                    var n = $("#search-overlay-result").clone().attr("id", "");
                    app.api.all.search({
                        keywords: t,
                        queryId: 0,
                        success: function(e) {
                            a.empty().data("search-keywords", t), _.each(e, function(e) {
                                var t = n.clone();
                                t.find(".search-overlay-result-poster").find("img").hide().attr("src", e.posterImage).on("load", function() {
                                    $(this).fadeIn()
                                }), t.find(".search-overlay-result-title").html(e.title), t.find(".search-overlay-result-year").html(e.year), t.attr("title", e.title), t.on("mousemove", function() {
                                    app.nav.paused() || app.nav.selectElement($(this))
                                }).on("mouseout", function() {
                                    app.nav.paused() || app.nav.deselect()
                                }).on("click", function() {
                                    $("#search-overlay-keywords").val($(this).find(".search-overlay-result-title").html()), $("#search-overlay-form").submit()
                                }), a.append(t.show())
                            })
                        }
                    })
                }
            }
        }, 200)).on("keydown", function(t) {
            if (27 === t.keyCode) return void e();
            if (40 === t.keyCode || 38 === t.keyCode) {
                var a = $("#search-overlay-results").find(".search-overlay-result");
                if (0 !== a.length) {
                    0 === a.filter(".selected").length ? app.nav.selectElement($(a.get(0))) : (40 === t.keyCode && app.nav.down(), 38 === t.keyCode && app.nav.up());
                    var n = a.filter(".selected");
                    $("#search-overlay-keywords").val(n.find(".search-overlay-result-title").html())
                }
            }
        }), $("#search-bar").on("submit", function(e) {
            e && e.preventDefault && e.preventDefault();
            var t = $("#keywords").blur().val();
            return hasher.setHash("search"), hasher.setHash("search/" + t), !1
        }), $("#search-genre").on("change", function() {
            $("#search-bar").submit()
        }), $("#search-sort").on("change", function() {
            $("#search-bar").submit()
        })
    }, e.settings = function() {
        for (var t = $("[data-storage-id]"), a = {
                "settings-max-download-speed": function(e) {
                    return e = parseInt(e, 10), isNaN(e) || 0 > e ? void $("#max-download-speed").val("0").trigger("change") : void app.btapp.live("settings", function(t) {
                        t && t.save({
                            max_dl_rate: e
                        })
                    })
                },
                "settings-max-upload-speed": function(e) {
                    return e = parseInt(e, 10), isNaN(e) || 0 > e ? void $("#max-upload-speed").val("0").trigger("change") : void app.btapp.live("settings", function(t) {
                        t && t.save({
                            max_ul_rate: e
                        })
                    })
                },
                "settings-keyboard-shortcuts": function(t) {
                    e.keyboardShortcuts()
                },
                "settings-default-subtitle-language": function(e) {
                    app.player.videojs.setDefaultSubLanguage(e)
                }
            }, n = function() {
                for (var e = 0; e < t.length; e++) {
                    var n = $(t.get(e)),
                        r = "checkbox" === n.attr("type") ? n.is(":checked") : n.val();
                    $.jStorage.set(n.attr("data-storage-id"), r), a.hasOwnProperty(n.attr("data-storage-id")) && a[n.attr("data-storage-id")](r)
                }
            }, r = 0; r < t.length; r++) {
            var i = $(t.get(r));
            "checkbox" === i.attr("type") && (i.val = function(e) {
                var t = $(this);
                return "undefined" == typeof e ? t.is(":checked") : (t.attr("checked", e), t)
            }), null !== $.jStorage.get(i.attr("data-storage-id")) ? i.val($.jStorage.get(i.attr("data-storage-id"))).on("change", n) : $.jStorage.set(i.attr("data-storage-id"), i.val())
        }
        $("#settings").submit(function(e) {
            e.preventDefault();
            for (var a = 0; a < t.length; a++) {
                var n = $(t.get(a));
                n.trigger("change")
            }
            return !1
        }), $("#settings-reset").on("click", function() {
            if (confirm("Warning: Are you sure you want to reset all settings?")) {
                for (var e = 0; e < t.length; e++) {
                    var a = $(t.get(e));
                    null !== $.jStorage.get(a.attr("data-storage-id")) && $.jStorage.deleteKey(a.attr("data-storage-id"))
                }
                window.location.reload()
            }
        }), $("#default-download-directory").on("focus", function() {
            app.btapp.browseforfolder && app.btapp.browseforfolder(function(e) {
                "string" == typeof e && $("#default-download-directory").val(e).trigger("change")
            })
        })
    }, e.sidebar = function() {
        $("#sidebar-bookmarks").on("click", function() {
            hasher.setHash("bookmarks")
        }), $("#sidebar-history").on("click", function() {
            hasher.setHash("history")
        }), $("#sidebar-search").on("click", function() {
            $("#search-results").is(":visible") ? $("#keywords").focus() : ($("#search-overlay-container").animate({
                width: "400px"
            }), $("#search-overlay").data("previous-view", app.nav.currentView()).fadeIn(400, function() {
                $("#search-overlay-keywords").val("").focus()
            }), app.nav.switchView("search-overlay"))
        }), $("#sidebar-movies").on("click", function() {
            hasher.setHash("movies")
        }), $("#sidebar-tv-shows").on("click", function() {
            hasher.setHash("tv")
        }), $("#sidebar-downloads").on("click", function() {
            hasher.setHash("downloads")
        }), $("#open-settings").on("click", function() {
            fn.openModal("#settings-modal")
        }), $("#open-info").on("click", function() {
            fn.openModal("#info-modal")
        }), $("#open-keyboard-shortcuts").on("click", function() {
            fn.openModal("#keyboard-shortcuts-modal")
        }), $("#sidebar-donate").click(function(e) {
            return e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation(), $("#sidebar-donate-popover").fadeIn(), $("body").add("#sidebar-donate-popover-close").click(function t(e) {
                $("#sidebar-donate-popover").fadeOut(), $("body").unbind("click", t)
            }), !1
        }), $("#sidebar-donate-popover").click(function(e) {
            e && e.stopPropagation && e.stopPropagation()
        })
    }, e.torqueConnectBtn = function() {
        $("#setup-torque").on("click", function() {
            fn.connectToTorque()
        }), $(document).bind("close.facebox", function() {
            $("#facebox, #facebox_overlay").hide()
        })
    }, e.torqueMessageReciever = function() {
        var e = {
            "plugin:plugin_installed": "plugin installed",
            "plugin:plugin_running": "plugin running",
            "plugin:client_installed": "client installed",
            "plugin:client_running": "client running",
            "client:connected": "client connecting",
            "client:disconnected": "client disconnected",
            sync: "client connected",
            "client:error": "error",
            "input:creating_torrent": "creating torrent",
            "input:torrent_created": "torrent created",
            "input:redirecting": "redirecting",
            "input:waiting_for_folder_selection": "waiting for selection",
            "input:no_files_selected": "no files selected"
        };
        app.btapp.on("all", function(t) {
            e.hasOwnProperty(t) && (app.status = e[t], "client installed" === app.status && (app.installed = !0), "client connected" === app.status && (app.connected = !0), "client disconnected" === app.status && (app.connected = !1), "sync" !== t && console.log(t))
        })
    }, e.userTorrent = function() {
        $("#add-torrent-start").on("click", function() {
            $("#add-torrent-form").submit()
        }), $("#add-torrent-form").on("submit", function(e) {
            e.preventDefault();
            var t = $("#add-torrent-link").val();
            return "" !== t && app.torrents.play(t), !1
        })
    }, e.views = function() {
        function e(e, t) {
            crossroads.parse(e), ga("send", "pageview", "#!" + e)
        }
        var a = $("#sidebar");
        new app.nav.View("bookmarks", [a, $("#movie-bookmarks-results"), $("#tv-bookmarks-results")]), new app.nav.View("history", [a, $("#movie-history-results"), $("#tv-history-results")]), new app.nav.View("search-overlay", [a, $("#search-overlay-results")]), new app.nav.View("search", [a, $("#movie-search-results"), $("#tv-search-results")]), new app.nav.View("results", [a, $("#results")]), new app.nav.View("downloads", [a], 0), new app.nav.View("movie-details", [a, $("#movie-details")]), new app.nav.View("tv-details", [a, $("#tv-details-seasons"), $("#tv-details-episodes"), $("#tv-details-episode")]), new app.nav.View("tv-torrents", [$("#tv-show-torrent-links")], 0), new app.nav.View("tv-season-torrents", [$("#tv-show-season-torrent-links")], 0), new app.nav.View("file-list", [$("#file-select-list")], 0), $(".navigable-item").on("mousemove", function() {
            app.nav.paused() || app.nav.selectElement($(this))
        }).on("mouseout", function() {
            app.nav.paused() || app.nav.deselect()
        }), crossroads.ignoreState = !0, app.routes = {
            "*": crossroads.bypassed.add(function() {
                hasher.replaceHash("movies"), hasher.setHashSilently("")
            }),
            bookmarks: crossroads.addRoute("/bookmarks", function() {
                t($("#sidebar-bookmarks")), app.nav.switchView("bookmarks"), $("#bookmarks").fadeIn(), app.lists.renderList("bookmarks", {
                    movie: $("#movie-bookmarks-results"),
                    tvShow: $("#tv-bookmarks-results")
                }, {
                    movie: "You haven't added any movies to your bookmarks yet.",
                    tvShow: "You haven't added any TV shows to your bookmarks yet."
                })
            }),
            history: crossroads.addRoute("/history", function() {
                t($("#sidebar-history")), app.nav.switchView("history"), $("#history").fadeIn(), app.lists.renderList("history", {
                    movie: $("#movie-history-results"),
                    tvShow: $("#tv-history-results")
                }, {
                    movie: "You haven't watched any movies yet.",
                    tvShow: "You haven't watched any TV shows yet."
                })
            }),
            search: crossroads.addRoute("/search/:keywords:", function(e) {
                t($("#sidebar-search")), app.nav.switchView("search"), $("#search-results").fadeIn();
                var a = {};
                $("#keywords").val(e), a.keywords = e;
                var n = $("#search-sort").find(":selected"),
                    r = n.data("sort");
                "string" == typeof r && (a.sort = r);
                var i = n.data("sort-order");
                "string" == typeof i && (a.sortOrder = i);
                var s = $("#search-genre").find(":selected"),
                    o = s.data("movie-genre");
                "string" == typeof o && (a.genre = o), app.media.movie.list({
                    container: $("#movie-search-results"),
                    filter: a
                }), delete a.genre, o = s.data("tv-genre"), "string" == typeof o && (a.genre = o), app.media.tvShow.list({
                    container: $("#tv-search-results"),
                    filter: a
                }), ga("send", "pageview", "?q=" + e)
            }),
            movies: crossroads.addRoute("/movies/:id:", function(e) {
                if ("undefined" == typeof e) t($("#sidebar-movies")), app.nav.switchView("results"), $("#results").fadeIn(), app.media.movie.list();
                else {
                    "movies" === hasher.getHashAsArray()[0] && $("#results").is(":visible") || hasher.setHash("movies");
                    var a = $("#movie-details"),
                        n = a.data("result");
                    n && +n.ytsId === +e ? (a.data("previous-hash", "movies"), app.media.movie.openDetails(n), hasher.setHashSilently("movies/" + n.ytsId), document.title = n.metadata.title + " | webflix.me", a.data("result", null)) : app.media.movie.byId({
                        container: $(""),
                        render: function(e) {
                            a.data("result", e), hasher.setHash("movies/" + e.ytsId)
                        },
                        items: [{
                            ytsId: e
                        }]
                    })
                }
            }),
            tv: crossroads.addRoute("/tv/:id:", function(e) {
                if ("undefined" == typeof e) t($("#sidebar-tv-shows")), app.nav.switchView("results"), $("#results").fadeIn(), app.media.tvShow.list();
                else {
                    "tv" === hasher.getHashAsArray()[0] && $("#results").is(":visible") || hasher.setHash("tv");
                    var a = $("#tv-details"),
                        n = a.data("result");
                    n && +n.tmdbId === +e ? (a.data("previous-hash", "tv"), app.media.tvShow.openDetails(n), hasher.setHashSilently(app.routes.tv.interpolate({
                        id: e
                    })), document.title = n.metadata.title + " | webflix.me", a.data("result", null)) : app.media.tvShow.byId({
                        container: $(""),
                        render: function(e) {
                            a.data("result", e), hasher.setHash("tv/" + e.tmdbId)
                        },
                        items: [{
                            tmdbId: e
                        }]
                    })
                }
            }),
            downloads: crossroads.addRoute("/downloads", function() {
                t($("#sidebar-downloads")), app.nav.switchView("downloads"), app.torrents.renderList($("#torrent-list")), $("#downloads").fadeIn().data("update-interval", setInterval(function() {
                    app.torrents.renderList($("#torrent-list"))
                }, 1e3))
            })
        };
        var n = {
                bookmarks: "Bookmarks",
                history: "History",
                search: "Search",
                movies: "Movies",
                tv: "TV",
                downloads: "Downloads"
            },
            r = "d2ViZmxpeC5tZQ==",
            i = hasher.setHash;
        hasher.setHash = function(e) {
            n[e] ? document.title = n[e] + " | " + atob(r) : document.title = atob(r), i.apply(hasher, arguments)
        }, hasher.setHashSilently = function(e) {
            hasher.changed.active = !1, hasher.setHash(e), hasher.changed.active = !0
        }, hasher.prependHash = "!", hasher.initialized.add(e), hasher.changed.add(e), hasher.init()
    }, e.window = function() {
        $(window).on("beforeunload", function() {
            if (app.connected) {
                var e = $("#keep-downloaded-files").is(":checked");
                app.btapp.get("torrent").each(function(t) {
                    t.stop(), e || t.remove(Btapp.TORRENT.REMOVE.DELETE_TORRENT_AND_DATA)
                })
            }
        }).on("resize", _.throttle(function() {
            var e = $("#results");
            e.outerWidth() / e.outerHeight() > 1280 / 720 ? $("#movie-details-backdrop, #tv-details-backdrop").find("img").width("100%").height("auto") : $("#movie-details-backdrop, #tv-details-backdrop").find("img").height("100%").width("auto")
        }, 500)).resize()
    }
}(window.app), $(document).ready(function() {
        app.setup.settings(), app.setup.errorTracking(), app.setup.keyboardShortcuts(), app.setup.loadNewPage(), app.setup.modals(), app.setup.search(), app.setup.sidebar(), app.setup.torqueConnectBtn(), app.setup.userTorrent(), app.setup.views(), app.setup.window(), app.player.projekktor = projekktor("#projekktor-player"), app.player.videojs = videojs("videojs-player"), fn.connectToTorque()
    }),
    function(e) {
        "use strict";
        e.torrents || (e.torrents = {}), e = e.torrents;
        var t = {},
            a = ["avi", "mp4", "mkv"],
            n = function(e) {
                this.hash = e.hash, this.url = e.url, this._btapp = e._btapp || app.btapp.get("torrent").get(this.hash);
                var t = this._btapp.get("properties");
                if (this.name = t.get("name"), this.size = t.get("size"), this.progress = this.size > 0 ? Math.round(1e3 * t.get("downloaded") / this.size) / 10 : 0, this.downloadSpeed = t.get("download_speed"), this.metadataResolved = t.get("metadata_resolved"), e.files) this.files = e.files;
                else {
                    var n = this.files = [];
                    this._btapp.get("file").each(function(e) {
                        var t = e.get("properties"),
                            i = t.get("name"),
                            s = i.substr(i.lastIndexOf(".") + 1).toLowerCase();
                        return t.get("is_streamable") && -1 !== a.indexOf(s) ? void n.push(new r({
                            name: t.get("name"),
                            size: t.get("size"),
                            downloaded: t.get("downloaded"),
                            streaming_url: t.get("streaming_url"),
                            torrent: e.get("torrent"),
                            _btapp: e
                        })) : void t.save({
                            priority: Btapp.TORRENT.FILE.PRIORITY.NO_DOWNLOAD
                        })
                    })
                }
            },
            r = function(e) {
                this.name = e.name, this.size = e.size, this.downloaded = e.downloaded, this.streaming_url = e.streaming_url, this.torrent = e.torrent, this._btapp = e._btapp
            },
            i = function(e) {
                return null !== e.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}/i)
            },
            s = function(e) {
                return null !== e.match(/^[a-z0-9]{32,40}$/i)
            },
            o = function(e) {
                return "torrent" === e.split("?")[0].split("#")[0].split(".").pop()
            },
            d = function(e) {
                var t = {},
                    a = e.split("magnet:?")[1];
                if (!a || 0 === a.length) return t;
                var n = a.split("&");
                n.forEach(function(e) {
                    var a = e.split("=");
                    if (2 === a.length) {
                        var n = a[0],
                            r = a[1];
                        if ("dn" === n && (r = decodeURIComponent(r).replace(/\+/g, " ")), "tr" === n && (r = decodeURIComponent(r)), "kt" === n && (r = decodeURIComponent(r).split("+")), t[n])
                            if (Array.isArray(t[n])) t[n].push(r);
                            else {
                                var i = t[n];
                                t[n] = [i, r]
                            } else t[n] = r
                    }
                });
                var r;
                return t.xt && (r = t.xt.match(/^urn:btih:(.{40})/)) ? t.infoHash = r[1] : t.xt && (r = t.xt.match(/^urn:btih:(.{32})/)) && (t.infoHash = r[1]), t.dn && (t.name = t.dn), t.kt && (t.keywords = t.kt), "string" == typeof t.tr ? t.announce = [t.tr] : Array.isArray(t.tr) && (t.announce = t.tr), t
            },
            l = e.add = function(e, a) {
                return app.connected ? (console.log("torrents: adding: ", e), s(e) && (e = "magnet:?xt=urn:btih:" + e), void app.btapp.get("add").torrent({
                    url: e,
                    location: $("#default-download-directory").val(),
                    callback: function(r) {
                        var s = function(r, i) {
                            console.log("torrents: added: ", r), t[r] = new n({
                                hash: r,
                                url: e,
                                _btapp: i
                            }), a && a(r)
                        };
                        app.btapp.live("torrent * properties", function o(t, a) {
                            if (app.btapp.unbind("torrent * properties", o), i(e)) {
                                if (t.get("hash").toLowerCase() !== d(e).infoHash.toLowerCase()) return
                            } else if (t.get("uri").toLowerCase() !== e.toLowerCase() && t.get("download_url").toLowerCase() !== e.toLowerCase()) return;
                            s(t.get("hash"), a)
                        })
                    }
                })) : void fn.connectToTorque()
            },
            p = e.get = function(e) {
                return "*" === e ? t : t[e]
            },
            c = e.start = function(e) {
                var t = p(e)._btapp;
                t.start(), t.unpause(), t.set_priority(Btapp.TORRENT.PRIORITY.MEDIUM), _.each(p(e).files, function(e) {
                    e._btapp.get("properties").save({
                        priority: Btapp.TORRENT.FILE.PRIORITY.MEDIUM
                    })
                }), t.get("properties").unbind("change", w).on("change", w)
            },
            u = e.stop = function(e) {
                var t = p(e)._btapp;
                t.stop(), t.get("properties").unbind("change", w)
            },
            f = e.remove = function(e) {
                "undefined" != typeof p(e) && ("undefined" != typeof p(e)._btapp && p(e)._btapp.remove(Btapp.REMOVE.DELETE_BOTH), delete t[e])
            },
            v = e.play = _.throttle(function(e, a, n) {
                if (!s(e) && !o(e) && !i(e)) return void console.log("torrents: play: invalid hash: ", e);
                if ("undefined" == typeof p(e)) return void l(e, function(e) {
                    v(e, a, n)
                });
                c(e);
                var d = $("#download-stats").hide();
                if (!p(e).metadataResolved) return v(e, a, n), void fn.status("Connecting...");
                fn.status("Connected");
                var b = p(e).files;
                if ("undefined" == typeof n || !(b[n] instanceof r)) return void m(b, function(t, n) {
                    -1 === n ? (f(e), fn.status(!1), fn.openModal("#no-files-warning-modal")) : v(e, a, n)
                });
                _.each(t, function(t) {
                    e !== t.hash && u(t.hash)
                }), 1 !== b.length && _.each(b, function(e, t) {
                    e._btapp.get("properties").save(t === n ? {
                        priority: Btapp.TORRENT.FILE.PRIORITY.MEDIUM
                    } : {
                        priority: Btapp.TORRENT.FILE.PRIORITY.NO_DOWNLOAD
                    })
                });
                var w = function() {
                        b = p(e).files;
                        var t = 100 * b[n].downloaded / b[n].size;
                        if (t >= 100 || "undefined" == typeof p(e)) {
                            p(e)._btapp.get("properties").unbind("change"), d.hide(), u(e);
                            var a = $("#player"),
                                r = a.data("next-hash");
                            r && (s(r) && "undefined" != typeof p(r) ? k(r) : l(r, k))
                        } else g(b[n].name, t, p(e).downloadSpeed, !1), d.show()
                    },
                    k = function(e) {
                        console.log("preloading next:", e), c(e);
                        var t = function() {
                            g(p(e).name, p(e).progress, p(e).downloadSpeed, !0), d.show()
                        };
                        p(e)._btapp.get("properties").unbind("change", t).on("change", t);
                        var a = $("#player"),
                            n = a.data("on-close");
                        a.data("next-hash", null), a.data("on-close", function() {
                            u(e), $("#keep-downloaded-files").is(":checked") || f(e), n && n()
                        })
                    };
                p(e)._btapp.get("properties").unbind("change", w).on("change", w);
                var I = 0,
                    q = [],
                    T = _.throttle(function() {
                        q.push(p(e).downloadSpeed), q.length > 10 && (q = q.slice(q.length - 10));
                        var t = _.reduce(q, function(e, t) {
                            return e + t
                        }, 0) / q.length;
                        I = Math.max(I, h(t, b[n].size, b[n].downloaded)), 100 >= I ? (fn.status("Buffering...", I + "%"), T()) : (fn.status("Buffering...", "100%"), fn.status(!1), y(b[n], a))
                    }, 500);
                T()
            }, 500),
            m = function(e, t) {
                if (1 === e.length) return void t(e[0], 0);
                if (e.length <= 0) return void t(null, -1);
                var a = $("#file-select-list").empty();
                _.each(e, function(n, r) {
                    var i = n.name,
                        s = Math.round(100 * n.size / 1048576) / 100,
                        o = $("<div class='link navigable-item' title='" + i + "'>" + (r + 1) + ". " + i + "</div>"),
                        d = $("<span class='link-info'>" + s + " MB</span>");
                    o.on("click", function() {
                        t(e[r], r)
                    }).on("mousemove", function() {
                        app.nav.paused() || app.nav.selectElement(o)
                    }).on("mouseout", function() {
                        app.nav.paused() || app.nav.deselect()
                    }), a.append(o.append(d))
                }), fn.status(!1), fn.openModal("#file-list-modal"), app.nav.switchView("file-list")
            },
            h = function(e, t, a) {
                var n = 100 * a / t,
                    r = t === a ? 0 : (t - a) / e,
                    i = 2700;
                return Math.max(Math.round(1e3 * i / r) / 10, Math.round(1e3 * n / app.maxBufferPercentage) / 10)
            },
            g = function(e, t, a, n) {
                a = Math.round(10 * a / 1024) / 10;
                var r = 1024,
                    i = $(".download-stats");
                i.removeClass("low med high"), a > .005 * r && i.addClass(.2 * r > a ? "low" : .75 * r > a ? "med" : "high"), i.each(function() {
                    var r = $(this);
                    r.find(".download-stats-filename").html(e).attr("title", e), n ? r.find(".download-stats-preloading").show() : r.find(".download-stats-preloading").hide(), r.find(".download-stats-progress").find(".bar").css("width", t + "%").siblings(".percentage").html(Math.round(10 * t) / 10 + "%"), r.find(".download-stats-speed").html(a + " KB/s");
                    var i = r.find(".download-stats-speed-chart");
                    i.append("<div class='bar' data-speed='" + a + "'></div>");
                    var s = _.reduce(i.children(), function(e, t) {
                        return Math.max($(t).attr("data-speed"), e)
                    }, 1);
                    i.children().each(function() {
                        $(this).height(100 * $(this).attr("data-speed") / s + "%")
                    }), i.children().length > 50 && i.children().first().remove()
                }), i.show()
            },
            y = function(e, t) {
                var a = t ? t.metadata.title : e.name,
                    n = e.name.substr(e.name.lastIndexOf(".") + 1).toLowerCase();
                if (-1 !== ["mkv", "mp4", "avi"].indexOf(n)) {
                    var r = e.streaming_url;
                    console.log("playing media: " + n + " file from " + r), $("#file-list-modal").is(":visible") && ($("#file-list-modal, .modal, #modal-bg, #status").hide(), $("#modal-bg").attr("data-modal", "")), app.player.projekktor.setStop && app.player.projekktor.setStop(),
                        app.player.videojs.pause && app.player.videojs.pause(), $(".player").hide(), fn.openModal("#player");
                    var i = $("#player");
                    i.data("on-close", function() {
                        app.player.projekktor.setStop && app.player.projekktor.setStop(), app.player.videojs.pause && app.player.videojs.pause(), u(e.torrent), $("#keep-downloaded-files").is(":checked") || f(e.torrent), i.data("next-hash", null), i.data("on-close", null)
                    }), t && app.lists.addToList("history", t.mediaType, t), t && ga("send", "event", t.mediaType, "play", t.imdbId);
                    var s = $("<div id='player-overlay' style='display: none'></div>").append("<div class='overlay-title' title='" + a + "'><a onclick='$(\"#modal-bg\").click()' style='padding-right: 20px'><i class='icon-chevron-left'></i></a>" + a + "</div>").append($("#download-stats").clone().attr("id", "")),
                        o = function() {
                            u(e.torrent), $("#keep-downloaded-files").is(":checked") || f(e.torrent);
                            var t = $("#player"),
                                a = t.data("on-ended");
                            a && a(), t.data("on-ended", null)
                        };
                    if ("avi" === n) {
                        for (var d = !1, l = 0; l < navigator.plugins.length; l++)
                            if (-1 != navigator.plugins[l].name.indexOf("VLC")) {
                                d = !0;
                                break
                            }
                        if (d) {
                            $("#player").attr("class", "modal modal-full projekktor"), $("#video-overlay").remove();
                            var p, c = function() {
                                clearTimeout(p), s.is(":hidden") && s.fadeIn(), p = setTimeout(function() {
                                    s.fadeOut()
                                }, 2500)
                            };
                            $("#projekktor-player").append(s), $("#projekktor-container").unbind("mousemove", c).on("mousemove", c), app.player.projekktor.removeListener("done", o), app.player.projekktor.addListener("done", o), app.player.projekktor.setFile(r, "video/x-msvideo"), app.player.projekktor.setPlay()
                        } else console.log("VLC Web Player is not yet installed"), fn.openModal("#vlc-install-modal")
                    } else $("#player").attr("class", "modal modal-full videojs"), app.player.videojs.controls(!1), app.player.videojs.on("loadeddata", function() {
                            app.player.videojs.controls(!0)
                        }), app.player.videojs.off("ended").on("ended", o), app.player.videojs.on("error", function() {
                            $(".vjs-error-retry").remove();
                            var e = $("<a class='vjs-error-retry'><i class='icon-repeat'></i></a>");
                            e.on("click", function() {
                                app.player.videojs.src(r).play()
                            }), $(".vjs-error-display").append(e)
                        }), app.player.videojs.overlay({
                            content: s.fadeIn()
                        }), app.player.videojs.src(r).play(),
                        function v(e) {
                            app.player.videojs.clearTextTracks(), t && "movie" === t.mediaType && app.api.movie.subtitle.langs({
                                imdbId: t.imdbId,
                                success: function(e, t, a) {
                                    app.player.videojs.addTextTrack("subtitles", e, t, {
                                        src: a
                                    })
                                },
                                error: function() {
                                    3 > e && setTimeout(function() {
                                        v(e + 1)
                                    }, 3e3)
                                }
                            })
                        }(1)
                }
            },
            b = e.updateAll = _.throttle(function() {
                app.connected && app.btapp.live("torrent * properties", w)
            }, 5e3),
            w = function(e) {
                app.connected && "undefined" != typeof app.btapp.get("torrent").get(e.get("hash")) && (t[e.get("hash")] = new n({
                    hash: e.get("hash"),
                    url: e.get("uri")
                }))
            };
        e.renderList = function(e) {
            e = e || $("<table></table>"), b();
            var a = _.map(t, function(e) {
                return _.pick(e, "hash", "downloadSpeed", "progress")
            });
            if (_.isEqual(e.data("torrent-data"), a)) return e;
            if (e.data("torrent-data", a), e.empty(), 0 === _.size(t)) return e.append("<tr style='border: none'><td class='no-results' style='padding: 20px'>No files...</td></tr>"), e;
            var n = $("<tbody></tbody>"),
                r = $("#torrent-list-row-template");
            return e.append("<thead><tr><th>Name</th><th>Size</th><th>Speed</th><th>Progress</th><th></th></tr></thead>"), e.data("torrents", t), _.each(t, function(e) {
                var t = r.clone();
                t.find(".torrent-list-name").attr("title", e.name.replace(/['"]/g, "")).html(e.name);
                var a = t.find(".torrent-list-progress");
                a.find(".bar").width(e.progress + "%"), a.find(".percentage").html(e.progress + "%"), t.find(".torrent-list-speed").find("span").html(Math.round(10 * e.downloadSpeed / 1024) / 10 + " KB/s"), t.find(".torrent-list-size").find("span").html(Math.round(100 * (e.size / 1073741824)) / 100 + " GB"), t.find(".torrent-list-name").on("click", function() {
                    v(e.hash)
                }), e.downloadSpeed > 0 ? (t.find(".torrent-list-start").hide(), t.find(".torrent-list-stop").show().on("click", function() {
                    $(this).is(".disabled") || ($(this).find(".icon-pause").removeClass("icon-pause").addClass("icon-spinner"), u(e.hash))
                })) : (t.find(".torrent-list-stop").hide(), t.find(".torrent-list-start").show().on("click", function() {
                    $(this).is(".disabled") || ($(this).find(".icon-download-circle").removeClass("icon-download-circle").addClass("icon-spinner"), c(e.hash))
                })), e.progress >= 100 && t.find(".torrent-list-start, .torrent-list-stop").addClass("disabled"), t.find(".torrent-list-open-containing").on("click", function() {
                    p(e.hash)._btapp.open_containing()
                }), t.find(".torrent-list-remove").on("click", function() {
                    f(e.hash)
                }), n.append(t)
            }), e.append(n)
        }
    }(window.app);