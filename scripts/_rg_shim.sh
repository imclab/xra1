#!/usr/bin/env bash
# Shared ripgrep fallback shim — source this from any script that uses rg.
# If rg is installed, does nothing. If not, defines rg() as a grep wrapper
# supporting the most commonly used rg flags in this project.
#
# Usage: source "$(dirname "${BASH_SOURCE[0]}")/_rg_shim.sh"

if ! command -v rg >/dev/null 2>&1; then
  rg() {
    local pattern="" files=() quiet=0 list=0 ignore_case=0 fixed=0 line_num=0 count_only=0 max_count=""
    while [ $# -gt 0 ]; do
      case "$1" in
        -q) quiet=1; shift ;;
        -l) list=1; shift ;;
        -i) ignore_case=1; shift ;;
        -n) line_num=1; shift ;;
        -c) count_only=1; shift ;;
        -F) fixed=1; shift ;;
        -S) shift ;; # smart-case: skip (grep -i approximates)
        -qi|-iq) quiet=1; ignore_case=1; shift ;;
        --max-count) max_count="$2"; shift 2 ;;
        --max-count=*) max_count="${1#*=}"; shift ;;
        --glob|--type|--hidden) shift; [ $# -gt 0 ] && shift ;; # skip unsupported rg-only flags with args
        --) shift; break ;;
        -*) shift ;; # skip other unknown rg flags
        *) if [ -z "$pattern" ]; then pattern="$1"; else files+=("$1"); fi; shift ;;
      esac
    done
    local gflags=("-E")
    [ "$quiet" = 1 ] && gflags+=("-q")
    [ "$list" = 1 ] && gflags+=("-l")
    [ "$ignore_case" = 1 ] && gflags+=("-i")
    [ "$fixed" = 1 ] && gflags+=("-F")
    [ "$line_num" = 1 ] && gflags+=("-n")
    [ "$count_only" = 1 ] && gflags+=("-c")
    [ -n "$max_count" ] && gflags+=("-m" "$max_count")
    if [ ${#files[@]} -gt 0 ]; then
      grep "${gflags[@]}" "$pattern" "${files[@]}"
    else
      grep "${gflags[@]}" "$pattern"
    fi
  }
fi
