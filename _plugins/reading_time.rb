# frozen_string_literal: true

require "liquid"

module Jekyll
  module ReadingTime

    def reading_time(input)
      words = input.split(" ").count
      minutes = (words / words_per_minute).floor
      minutes = 1 if minutes < 1
      "#{minutes} min read"
    end

    private

    def words_per_minute
      @words_per_minute ||= reading_time_config.fetch("words_per_minute", 180)
    end

    def reading_time_config
      @reading_time_config ||=
        @context.registers[:site].config.fetch("reading_time", {})
    end
  end
end

Liquid::Template.register_filter(Jekyll::ReadingTime)
